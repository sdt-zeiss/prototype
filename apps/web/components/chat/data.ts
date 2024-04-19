// hardcoded data for interface

export const exhibitions = [
  {
    value: "decision",
    label: "Decision Making",
    description: "Decisions are so hard to make 😔",
  },
  {
    value: "scenarios",
    label: "Future Scenarios",
    description: "Society is changing so fast 🚀",
  },
];

export const instructions = `
I guess we will have to explain what the user should do here.

Enim quis occaecat amet do do pariatur id adipisicing officia
excepteur consequat ullamco commodo quis. Excepteur anim pariatur quis
elit consequat aute ullamco voluptate commodo cillum aliqua ad aute
incididunt. Enim duis pariatur dolore tempor esse cillum magna est
mollit consequat aliqua ad pariatur non. In laborum Lorem ullamco
incididunt. Nostrud velit sit pariatur cillum veniam amet aute ad.
`;

export type Message = {
  id: number;
  from: "System" | "User";
  content: string;
  timestamp: Date;
};

export const messages: Message[] = [
  {
    id: 1,
    from: "System",
    content: "Welcome to the chat!",
    timestamp: new Date("2022-01-01T00:00:00"),
  },
  {
    id: 2,
    from: "User",
    content: "Hello, I have a question boss",
    timestamp: new Date("2022-01-01T00:01:00"),
  },
  {
    id: 3,
    from: "System",
    content: "Aye aye, what's up?",
    timestamp: new Date("2022-01-01T00:02:00"),
  },
  {
    id: 4,
    from: "User",
    content: "What is the purpose of setting goals if we all die anyway?",
    timestamp: new Date("2022-01-01T00:03:00"),
  },
  {
    id: 5,
    from: "System",
    content: "This is about decision making mate",
    timestamp: new Date("2022-01-01T00:02:00"),
  },
];
