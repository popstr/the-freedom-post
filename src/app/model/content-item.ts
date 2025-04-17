export type ContentItem = {
  id: string;
  title: string;
  status: StatusType;
  authors: string[]; // Author ID's
  deadline?: string | null;
  type: string;
  content: string;
};

export type Author = {
    id: string;
    name: string;
    email: string;
}

// Define status types
export const STATUS_TYPES: Record<string, string> = {
    ALL: "all",
    DRAFT: "draft",
    IN_REVIEW: "in_review",
    PUBLISHED: "published",
    ARCHIVED: "archived"
  } as const;
  
export type StatusType = typeof STATUS_TYPES[keyof typeof STATUS_TYPES];

export const statusLabels: Record<StatusType, string> = {
    [STATUS_TYPES.ALL]: "All",
    [STATUS_TYPES.DRAFT]: "Draft",
    [STATUS_TYPES.IN_REVIEW]: "In Review",
    [STATUS_TYPES.PUBLISHED]: "Published",
    [STATUS_TYPES.ARCHIVED]: "Archived"
  };
  