import { useState } from "react";
import NavBar from "./components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function App() {
  const [tokenCounter, setTokenCounter] = useState(1);
  const [patientName, setPatientName] = useState("");
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleAddToken = () => {
    if (!patientName.trim()) return alert("Enter patient name.");
    const newToken = { id: tokenCounter, name: patientName.trim() };
    setPending([...pending, newToken]);
    setTokenCounter(tokenCounter + 1);
    setPatientName("");
  };

  const handleDone = (token) => {
    setPending(pending.filter((t) => t.id !== token.id));
    setCompleted([...completed, token]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white transition-colors">
      <NavBar />

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="bg-white dark:bg-zinc-900 transition-colors">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800 dark:text-blue-300">
              Add New Token
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full md:w-2/3 bg-white dark:bg-zinc-800"
            />
            <Button onClick={handleAddToken} className="w-full md:w-auto">
              Give Token
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-white dark:bg-zinc-800">
            <TabsTrigger value="pending">🟡 Pending</TabsTrigger>
            <TabsTrigger value="completed">✅ Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card className="bg-white dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-yellow-600">
                  Pending Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 pr-4">
                  {pending.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      No pending tokens
                    </p>
                  ) : (
                    pending.map((token) => (
                      <div
                        key={token.id}
                        className="flex justify-between items-center p-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md mb-3"
                      >
                        <span>
                          Token #{token.id} - {token.name}
                        </span>
                        <Button
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                          onClick={() => handleDone(token)}
                        >
                          Done
                        </Button>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card className="bg-white dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-green-600">
                  Completed Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 pr-4">
                  {completed.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      No completed tokens
                    </p>
                  ) : (
                    completed.map((token) => (
                      <div
                        key={token.id}
                        className="p-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md mb-3"
                      >
                        Token #{token.id} - {token.name}
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
