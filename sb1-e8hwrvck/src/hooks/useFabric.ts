import { useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import { toPng } from 'html-to-image';
import { useComponentStore } from '../store/componentStore';

const canvasInstances = new Map<string, fabric.Canvas>();

export const useFabric = (canvasId: string) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const { addComponent } = useComponentStore();

  useEffect(() => {
    // Check if canvas already exists
    if (canvasInstances.has(canvasId)) {
      canvasRef.current = canvasInstances.get(canvasId)!;
      return;
    }

    // Get the canvas element
    const canvasEl = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvasEl) return;

    const canvas = new fabric.Canvas(canvasId, {
      backgroundColor: 'transparent',
      width: 800,
      height: 600,
      preserveObjectStacking: true
    });

    canvasRef.current = canvas;
    canvasInstances.set(canvasId, canvas);

    return () => {
      if (canvasRef.current) {
        // Clear all objects first
        canvasRef.current.clear();
        // Remove from instances map
        canvasInstances.delete(canvasId);
        // Cleanup the canvas
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, [canvasId]);

  const addShape = useCallback((type: string, props = {}) => {
    if (!canvasRef.current) return;

    let shape;
    switch (type) {
      case 'rectangle':
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          ...props,
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          radius: 50,
          ...props,
        });
        break;
    }

    if (shape) {
      canvasRef.current.add(shape);
      canvasRef.current.renderAll();
    }
  }, []);

  const undo = useCallback(() => {
    // Basic undo implementation
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects();
      if (objects.length > 0) {
        canvasRef.current.remove(objects[objects.length - 1]);
      }
    }
  }, []);

  const createComponent = useCallback(async () => {
    if (!canvasRef.current) return;

    const activeObjects = canvasRef.current.getActiveObjects();
    if (activeObjects.length === 0) return;

    // Create a temporary canvas with just the selected objects
    const tempCanvas = new fabric.Canvas(document.createElement('canvas'));
    const group = new fabric.Group([...activeObjects], {
      left: 0,
      top: 0
    });

    // Calculate bounds
    const bounds = group.getBoundingRect();
    tempCanvas.setDimensions({
      width: bounds.width + 20,
      height: bounds.height + 20
    });

    // Center the group
    group.set({
      left: 10,
      top: 10
    });

    tempCanvas.add(group);
    tempCanvas.renderAll();

    // Convert to PNG
    const dataUrl = tempCanvas.toDataURL({
      format: 'png',
      quality: 1
    });

    // Get component properties
    const props = activeObjects.reduce((acc, obj) => {
      if (obj.type === 'textbox') {
        acc[`text_${obj.get('id')}`] = obj.text;
      }
      if (obj.type === 'rect' || obj.type === 'circle') {
        acc[`color_${obj.get('id')}`] = obj.fill;
      }
      return acc;
    }, {} as Record<string, any>);

    // Create component definition
    const componentName = `Component_${Date.now()}`;
    const component = {
      id: crypto.randomUUID(),
      name: componentName,
      thumbnail: dataUrl,
      objects: activeObjects.map(obj => obj.toObject()),
      props
    };

    addComponent(component);
    tempCanvas.dispose();

    return component;
  }, [addComponent]);

  return {
    canvas: canvasRef.current,
    addShape,
    undo,
    createComponent
  };
};