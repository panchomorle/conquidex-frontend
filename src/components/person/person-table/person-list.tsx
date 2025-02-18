"use client";

import PersonCard from "@/components/person/person-card/person-card";
import Link from "next/link";
import { useState } from "react";

interface PersonListProps {
  group: GroupData[];
  groupBy: "units" | "classes";
}

export const PersonList = ({ group, groupBy }: PersonListProps) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const HandleExpand = (classId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [classId]: !prev[classId],
    }));
  };

  return (
    <div className="w-full">
      {group.map((g) => {
        // Key única compuesta por club_id + unit_id

        const uniqueKey =
          groupBy === "units"
            ? `club-${(g as UnitGroup).club_id}-unit-${
                (g as UnitGroup).unit_id
              }`
            : `club-${(g as ClassGroup).club_id}-class-${
                (g as ClassGroup).class_id
              }`;

        const name =
          groupBy === "units"
            ? (g as UnitGroup).unit_name
            : (g as ClassGroup).class_name;

        const isExpanded = expanded[uniqueKey];
        return (
          <div
            key={uniqueKey}
            className="my-2 rounded-lg shadow-[4px_4px_0_0_#323232] p-2 border-2 border-slate-800"
            style={{ backgroundColor: `#${g.color}` }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{name}</h2>
              <button
                onClick={() => HandleExpand(uniqueKey)}
                className={`bg-transparent text-black text-xl font-bold transform transition-transform ${
                  isExpanded ? "rotate-0" : "rotate-90"
                }`}
              >
                ▼
              </button>
            </div>
            {isExpanded && (
              <div className="space-y-2">
                {g.persons && g.persons.map((person) => (
                  <Link
                    href={`/profile/${person.id}`}
                    key={`${uniqueKey}-person-${person.id}`}
                  >
                    <PersonCard person={person} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
