import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageTitle, LeadText } from "@/components/ui/typography";
import { MessageSquare, TrendingUp, ThumbsUp, MessageCircle, Flag } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// Sample data for posts and trending topics
const samplePosts = [
  {
    id: 1,
    author: "Alex Johnson",
    content: "Just completed my first machine learning project! Anyone here working on similar projects?",
    timestamp: "2 hours ago",
    likes: 0,
    replies: 0,
    isAdmin: false,
  },
  {
    id: 2,
    author: "Sarah Chen",
    content: "Looking for study partners for the upcoming AWS certification. Who's interested?",
    timestamp: "3 hours ago",
    likes: 0,
    replies: 0,
    isAdmin: true,
  },
];

export default function ForumPage() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(samplePosts);
  const maxCharacterLimit = 280;

  const handlePostSubmit = () => {
    if (newPost.trim() && newPost.length <= maxCharacterLimit) {
      const post = {
        id: posts.length + 1,
        author: "Current User",
        content: newPost,
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        isAdmin: false,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <PageTitle>
                Community Forum
              </PageTitle>
              <LeadText className="mt-6">
                Join the conversation, share your thoughts, and connect with fellow community members.
              </LeadText>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Post Creation */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Input
                      placeholder="What's on your mind?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      maxLength={maxCharacterLimit}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {newPost.length}/{maxCharacterLimit} characters
                      </span>
                      <Button
                        onClick={handlePostSubmit}
                        disabled={!newPost.trim() || newPost.length > maxCharacterLimit}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts List */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author}</span>
                          {post.isAdmin && (
                            <Badge variant="secondary">Admin</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {post.replies}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Community Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 list-disc pl-4">
                    <li>Be respectful and kind to others</li>
                    <li>No spam or self-promotion</li>
                    <li>Keep discussions relevant</li>
                    <li>Report inappropriate content</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
