export interface BuilderBlock {
  id: string;
  type: 'hero' | 'features' | 'testimonials' | 'pricing' | 'cta' | 'custom';
  content: Record<string, any>;
  style: Record<string, string>;
}

export interface BuilderSection {
  id: string;
  blocks: BuilderBlock[];
  settings: {
    backgroundColor?: string;
    padding?: string;
    maxWidth?: string;
  };
}

export interface DesignImport {
  type: 'figma' | 'canva';
  data: any;
}