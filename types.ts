
export enum ViewState {
  HOME = 'HOME',
  MAP = 'MAP',
  LEVEL = 'LEVEL',
  PROFILE = 'PROFILE',
  SHOP = 'SHOP'
}

export interface Variable {
  name: string;
  type: string;
  value: string;
}

export interface StoryContent {
  character: string; // e.g., "J-Bot"
  avatar: string; // Emoji or URL
  text: string;
  emotion: 'NEUTRAL' | 'HAPPY' | 'WORRIED' | 'ALERT';
}

export interface Level {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string; // e.g., "Variables", "Loops"
  task: string;
  initialCode: string;
  expectedOutput: string;
  hintTopics: string[]; // For UI display
  order: number;
  learningContent: {
    concept: string;
    explanation: string;
    exampleCode: string;
  };
  cheatSheet: string; // Brief syntax template
  story?: StoryContent; // New narrative field
}

export interface LevelProgress {
  levelId: string;
  status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED';
  stars: 0 | 1 | 2 | 3;
  attempts: number;
}

export interface UserState {
  currentLevelId: string | null;
  progress: Record<string, LevelProgress>;
  gems: number;
  streak: number;
  tutorialCompleted: boolean;
  unlockedThemes: string[]; // List of theme IDs owned by user
}

export interface CodeExecutionResult {
  success: boolean;
  output: string;
  feedback: string;
  compiled: boolean;
  variables?: Variable[]; // New field for memory visualization
}

export enum HintLevel {
  NONE = 0,
  GUIDE = 1,
  LOCATION = 2,
  CODE = 3
}

export interface Theme {
  id: string;
  name: string;
  price: number; // Cost in gems (0 for free)
  description: string;
  colors: {
    bgApp: string;
    bgPanel: string;
    bgEditor: string; // Keep editor distinct
    textMain: string;
    textSecondary: string;
    border: string;
    accent: string;
    buttonPrimary: string;
    buttonSecondary: string;
  };
}

export interface ShopItem {
  id: string;
  type: 'THEME';
  name: string;
  description: string;
  price: number;
  previewColor: string;
}
