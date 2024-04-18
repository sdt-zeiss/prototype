"use client";

import Input from "@/components/Input";
import React, { useState } from "react";
import Button from "@/components/Button";

export default function NavigationBar() {
  const [searchInput, setSearchInput] = useState();

  return (
    <nav className="flex h-16 w-full flex-row items-center justify-between bg-black px-3 py-2">
      <span className="mx-3 text-2xl font-bold text-white">MassMinds</span>
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="AI Search"
      />
      <Button
        onClick={() => {
          console.log("searching for", searchInput);
        }}
      >
        <span className="text-md text-base font-medium">Sign In</span>
      </Button>
    </nav>
  );
}
