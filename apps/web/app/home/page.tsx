"use client";

import NavigationBar from "@/components/NavigationBar";
import TitleBar from "@/components/TitleBar";
import PostCard from "@/components/post/PostCard";
import PostModal from "@/components/post/PostModal";
import { useState } from "react";

export type Comment = {
  content: string;
  author: string;
};

export type Post = {
  title: string;
  content: string;
  author: string;
  type: "Question" | "Discussion" | "Story";
  likes: number;
  comments: Comment[];
};

export default function Page() {
  const [openedPost, setOpenedPost] = useState<Post | null>(null);

  const posts: Post[] = [
    {
      title: "How to make decisions in an uncertain environment?",
      content:
        "I am currently working on a project where the requirements are constantly changing. How do you make decisions in such an uncertain environment?",
      author: "Oscar",
      type: "Question",
      likes: 5,
      comments: [
        {
          content: "I think you should use an agile approach.",
          author: "Alice",
        },
        {
          content: "I think you should use a waterfall approach.",
          author: "Bob",
        },
      ],
    },
    {
      title: "What is the best way to learn a new programming language?",
      content:
        "I am trying to learn a new programming language. What is the best way to learn it?",
      author: "Wendy",
      type: "Question",
      likes: 3,
      comments: [
        {
          content: "I think you should read a book.",
          author: "Alice",
        },
        {
          content: "I think you should watch video tutorials.",
          author: "Bob",
        },
      ],
    },
    {
      title: "How we decided which idea to choose to pitch our investors.",
      content:
        "When it came time to pick the best idea to show our investors, we had a lot to think about. We started with a lot of ideas, talked to people who  know the industry well, and asked potential customers what they  thought. We looked at which ideas could really work and which ones were  the most exciting. After a lot of discussion and careful thinking, one  idea really stood out. This story talks about how we made our decision,  the challenges we faced, and what helped us choose the idea that our  investors loved.",
      author: "Ursula",
      type: "Story",
      likes: 10,
      comments: [
        {
          content: "I think you made the right choice.",
          author: "George",
        },
        {
          content: "What did the investors say?",
          author: "Alice",
        },
      ],
    },
    {
      title: "How to manage a team remotely?",
      content:
        "With the shift to remote work, I'm struggling to effectively manage my team. What strategies can I use to improve communication and productivity?",
      author: "Max",
      type: "Question",
      likes: 8,
      comments: [
        {
          content: "Regular video check-ins can help maintain team cohesion.",
          author: "Alice",
        },
        {
          content:
            "Consider using project management tools to keep everyone aligned.",
          author: "Bob",
        },
      ],
    },
    {
      title: "Best practices for code reviews?",
      content:
        "I want to improve the quality of code reviews in my team. What are some best practices we can adopt?",
      author: "Nina",
      type: "Question",
      likes: 4,
      comments: [
        {
          content:
            "Always provide constructive feedback, focusing on the code and not the coder.",
          author: "Alice",
        },
        {
          content:
            "Use linters and automated tools to catch basic issues before the review.",
          author: "Bob",
        },
      ],
    },
    {
      title: "How to stay updated with the latest tech trends?",
      content:
        "Technology is evolving rapidly, and I find it overwhelming to keep up. How can I stay updated with the latest trends?",
      author: "Oliver",
      type: "Question",
      likes: 6,
      comments: [
        {
          content: "Follow tech blogs and influencers on social media.",
          author: "Alice",
        },
        {
          content: "Attend webinars and subscribe to tech newsletters.",
          author: "Bob",
        },
      ],
    },
    {
      title: "Improving customer service in a small business?",
      content:
        "As a small business owner, I want to enhance our customer service. What strategies can help us provide better support?",
      author: "Ella",
      type: "Question",
      likes: 7,
      comments: [
        {
          content:
            "Implement a customer feedback system to respond to issues more effectively.",
          author: "Alice",
        },
        {
          content:
            "Train your staff in communication and problem-solving skills.",
          author: "Bob",
        },
      ],
    },
    {
      title: "Reducing software development costs?",
      content:
        "Our software development costs are rising. How can we reduce these without compromising on quality?",
      author: "Liam",
      type: "Question",
      likes: 5,
      comments: [
        {
          content:
            "Adopt Agile methodologies to improve efficiency and reduce waste.",
          author: "Alice",
        },
        {
          content:
            "Consider outsourcing some development tasks to reduce expenses.",
          author: "Bob",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen flex-col items-center text-2xl font-bold">
      <NavigationBar />
      <TitleBar title="How to make decisions in an uncertain environment?" />
      <div className="mt-2 flex flex-col items-center gap-y-2">
        {posts.map((post) => (
          <PostCard
            key={post.author + post.title}
            post={post}
            onClick={() => setOpenedPost(post)}
          />
        ))}
      </div>
      {openedPost && (
        <PostModal post={openedPost} onClose={() => setOpenedPost(null)} />
      )}
    </div>
  );
}
