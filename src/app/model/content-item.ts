type ContentItem = {
    id: string;
    title: string;
    status: string;
    authors: Author[];
    deadline: Date;
    type: string;
    content: string;
}

type Author = {
    id: string;
    name: string;
    email: string;
}
