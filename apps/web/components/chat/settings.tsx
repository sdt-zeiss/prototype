import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/select";
import { exhibitions, instructions } from "./data";

export default function Settings() {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
        <div className="grid gap-3">
          <Label htmlFor="exhibition">Exhibition</Label>
          <Select>
            <SelectTrigger
              id="exhibition"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select an exhibition" />
            </SelectTrigger>
            <SelectContent>
              {exhibitions.map((exhibition) => (
                <SelectItem key={exhibition.value} value={exhibition.value}>
                  <div className="text-muted-foreground grid gap-0.5">
                    <span className="text-foreground font-medium">
                      {exhibition.label}
                    </span>
                    <p className="text-xs" data-description>
                      {exhibition.description}
                    </p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="temperature">Temperature</Label>
          <Input id="temperature" type="number" placeholder="0.4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="top-p">Top P</Label>
            <Input id="top-p" type="number" placeholder="0.7" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="top-k">Top K</Label>
            <Input id="top-k" type="number" placeholder="0.0" />
          </div>
        </div>
      </fieldset>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Instructions</legend>
        <div className="text-sm">{instructions}</div>
      </fieldset>
    </form>
  );
}
