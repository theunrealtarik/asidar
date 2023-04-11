import React, { useEffect } from "react";

import { Button } from "@material-tailwind/react";
import { Tab } from "@headlessui/react";

import Views from "./views";
import Labels from "./components/Labels";

const App: React.FC = () => {
  return (
    <main className="w-full h-screen">
      <Tab.Group as="aside" className="w-full h-full">
        <Tab.List className="fixed top-0 left-0 w-52 flex flex-col gap-y-2 p-2 h-full justify-between">
          <div>
            {Views.map((tab, index) => (
              <Tab as={React.Fragment} key={index}>
                {({ selected }) => (
                  <Button
                    variant={selected ? "filled" : "text"}
                    className="inline-flex items-center space-x-2 w-full"
                  >
                    <span>
                      <tab.icon />
                    </span>
                    <span>{tab.label}</span>
                  </Button>
                )}
              </Tab>
            ))}
          </div>
          <div>
            <Labels.FFMPEG />
          </div>
        </Tab.List>
        <Tab.Panels className="ml-52 h-full">
          {Views.map((tab, index) => (
            <Tab.Panel className="p-4 pl-2 w-full h-full" key={index}>
              <React.Suspense fallback={"Loading ..."}>
                <tab.component />
              </React.Suspense>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

export default App;
