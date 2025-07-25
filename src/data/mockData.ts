import { Post, PostDetail } from "../types";

export const mockPosts: Post[] = [
  {
    uuid: "1",
    content:
      "Just made my first million! The journey from 0 to here has been incredible. Started with a simple idea and lots of late nights. Anyone else grinding toward their first big milestone? 💪",
    author: {
      uuid: "user1",
      username: "$1,234,567",
      net_worth_tier: "gold",
      age: 28,
      gender: "M",
      location: "San Francisco, CA",
    },
    timestamp: new Date().toISOString(),
    vote_count: 127,
    comment_count: 23,
    post_type: "text",
  },
  {
    uuid: "2",
    content:
      "Market volatility has me questioning everything. How do you all stay calm when your portfolio swings 6 figures in a day?",
    author: {
      uuid: "user2",
      username: "$847,293",
      net_worth_tier: "silver",
      age: 34,
      gender: "F",
      location: "New York, NY",
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    vote_count: 89,
    comment_count: 45,
    post_type: "text",
  },
  {
    uuid: "3",
    content: "What should I prioritize next for building wealth?",
    author: {
      uuid: "user3",
      username: "$156,789",
      net_worth_tier: "bronze",
      age: 26,
      gender: "M",
      location: "Austin, TX",
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    vote_count: 67,
    comment_count: 12,
    post_type: "poll",
    poll_data: {
      question: "What should I prioritize next for building wealth?",
      options: [
        { id: "opt1", text: "Real Estate Investment", vote_count: 34 },
        { id: "opt2", text: "Stock Market", vote_count: 45 },
        { id: "opt3", text: "Start a Business", vote_count: 23 },
        { id: "opt4", text: "Crypto", vote_count: 12 },
      ],
      total_votes: 114,
    },
  },
  {
    uuid: "4",
    content:
      "Finally hit my target of $10M net worth! 🎉 Started from $50k in debt 15 years ago. AMA about the journey.",
    author: {
      uuid: "user4",
      username: "$10,450,123",
      net_worth_tier: "platinum",
      age: 42,
      gender: "M",
      location: "Miami, FL",
    },
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    vote_count: 456,
    comment_count: 89,
    post_type: "text",
  },
  {
    uuid: "5",
    content:
      "Thinking about quitting my job to focus on trading full-time. Current net worth $340k. Thoughts?",
    author: {
      uuid: "user5",
      username: "$340,256",
      net_worth_tier: "bronze",
      age: 29,
      gender: "F",
      location: "Chicago, IL",
    },
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    vote_count: 23,
    comment_count: 67,
    post_type: "text",
  },
];

export const mockPostDetail: PostDetail = {
  ...mockPosts[0],
  comments: [
    {
      uuid: "comment1",
      content: "Congrats! That's incredible. What industry are you in?",
      author: {
        uuid: "user4",
        username: "$2,450,123",
        net_worth_tier: "platinum",
        age: 31,
        gender: "F",
        location: "Seattle, WA",
      },
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      vote_count: 12,
      replies: [
        {
          uuid: "comment1-1",
          content:
            "Thanks! I'm in tech - built a SaaS platform for small businesses.",
          author: mockPosts[0].author,
          timestamp: new Date(Date.now() - 1500000).toISOString(),
          vote_count: 8,
          parent_uuid: "comment1",
        },
        {
          uuid: "comment1-2",
          content: "That's amazing! How long did it take to build?",
          author: {
            uuid: "user6",
            username: "$180,450",
            net_worth_tier: "bronze",
            age: 25,
            gender: "M",
            location: "Portland, OR",
          },
          timestamp: new Date(Date.now() - 1200000).toISOString(),
          vote_count: 3,
          parent_uuid: "comment1",
        },
      ],
    },
    {
      uuid: "comment2",
      content:
        "Amazing milestone! The first million is always the hardest. What's your next goal?",
      author: {
        uuid: "user5",
        username: "$789,456",
        net_worth_tier: "silver",
        age: 29,
        gender: "M",
        location: "Los Angeles, CA",
      },
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      vote_count: 15,
    },
    {
      uuid: "comment3",
      content: "Respect! 🙌 What was your biggest learning along the way?",
      author: {
        uuid: "user7",
        username: "$95,340",
        net_worth_tier: "bronze",
        age: 23,
        gender: "F",
        location: "Denver, CO",
      },
      timestamp: new Date(Date.now() - 4500000).toISOString(),
      vote_count: 8,
    },
  ],
};
