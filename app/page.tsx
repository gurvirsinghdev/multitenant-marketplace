import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <Button variant={"elevated"}>
        I am a button
      </Button>
      <Input placeholder="I am an Input" />
      <Progress value={50} />
      <Textarea placeholder="I am a Textarea" />
      <Checkbox />
    </div>
  );
}
