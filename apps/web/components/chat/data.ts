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
Welcome to our chat tool designed to help you resolve questions regarding decision making under uncertainty! Our chatbot is here to assist you with any queries you may have on this topic. Equipped with knowledge from panel discussions held at live events, our chatbot can provide insights, guidance, and examples shared by experts and individuals who have faced similar situations. Simply start a conversation by typing your question or concern, and our chatbot will do its best to provide helpful responses and support. Whether you're seeking advice on prioritizing variables, conducting scenario analysis, or drawing inspiration from real-life experiences, our chatbot is here to assist you every step of the way. Don't hesitate to ask for assistance whenever you need it!
`;

export type Message = {
  id: number;
  from: "System" | "User";
  content: string;
};

export const messages: Message[] = [
  {
    id: 1,
    from: "System",
    content:
      "Hello! I'm here to assist you with any questions or discussions you have regarding decision making under uncertainty. How can I help you today?",
  },
  {
    id: 2,
    from: "User",
    content:
      "Hi there! I'm trying to understand how to make decisions when there's a lot of uncertainty involved. Can you give me some guidance?",
  },
  {
    id: 3,
    from: "System",
    content:
      "Absolutely! Decision making under uncertainty is a complex but essential skill. One approach is to gather as much relevant information as possible to reduce uncertainty. Have you identified the key variables and factors influencing your decision?",
  },
  {
    id: 4,
    from: "User",
    content:
      "Yes, I have a general idea, but it's hard to predict how certain factors will play out in the future. How do I deal with that uncertainty?",
  },
  {
    id: 5,
    from: "System",
    content:
      "That's a common challenge. In such cases, it's helpful to conduct scenario analysis or use decision trees to evaluate different possible outcomes based on varying assumptions. In our panel discussion of the Decision making event, Dr. Sarah Johnson, a seasoned economist, shared her experience of navigating uncertainty in the stock market. She emphasized the importance of diversification and long-term thinking in her investment strategy. Dr. Johnson highlighted a specific instance where she remained steadfast in her investment decisions during a period of market volatility, ultimately reaping rewards as the market stabilized over time.",
  },
];
