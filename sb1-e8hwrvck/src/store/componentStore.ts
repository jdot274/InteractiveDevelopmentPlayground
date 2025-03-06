import { create } from 'zustand';

export interface Component {
  id: string;
  name: string;
  thumbnail: string;
  objects: any[];
  props: Record<string, any>;
}

interface ComponentStore {
  components: Component[];
  addComponent: (component: Component) => void;
  removeComponent: (id: string) => void;
}

export const useComponentStore = create<ComponentStore>((set) => ({
  components: [],
  addComponent: (component) =>
    set((state) => ({
      components: [...state.components, component],
    })),
  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
    })),
}));