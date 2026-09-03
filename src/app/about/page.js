import React from "react";
import ColoredBadge from "@/components/colored-badge";
import { Mail } from "lucide-react";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import CardStack from "@/components/card-stack";

const Hl = ({ children }) => (
  <span className="text-foreground font-medium">{children}</span>
);

export default function About() {
  return (
    <main className="px-6 pb-12 pt-36 w-full max-w-3xl mx-auto">
      <div className="text-2xl sm:text-3xl font-bold tracking-tight">
        <h1>I build backend architectures & intelligent systems,</h1>
        <h1 className="text-foreground/50">
          powered by code and curiosity.
        </h1>
      </div>

      <div className="mt-6 flex flex-col gap-6 text-muted-foreground">
        <p>
          I'm <Hl>Aziz Reja</Hl>, a <Hl>B.E.</Hl> student at{" "}
          <Hl>Jadavpur University</Hl> (2024–2028) and a full-stack & backend
          developer passionate about scalable systems, distributed architecture, and AI.
        </p>

        <p>
          {/* Bio placeholder - user will add later */}
        </p>

        <p>
          I'm{" "}
          <ColoredBadge
            text="Curious"
            className="bg-cyan-400/10 text-cyan-400"
          />
          ,{" "}
          <ColoredBadge
            text="Builder"
            className="bg-blue-400/10 text-blue-400"
          />
          ,{" "}
          <ColoredBadge
            text="Problem Solver"
            className="bg-emerald-400/10 text-emerald-400"
          />
          , and{" "}
          <ColoredBadge
            text="Backend Engineer"
            className="bg-purple-400/10 text-purple-400"
          />
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 text-foreground">
          Tech Stack
        </h2>

        <p>
          <Hl>Java</Hl>, <Hl>Spring Boot</Hl>, <Hl>Python</Hl>, <Hl>FastAPI</Hl>
          , <Hl>React</Hl>, <Hl>PostgreSQL</Hl>, <Hl>MongoDB</Hl>, <Hl>Git</Hl>
          , <Hl>GitHub</Hl>, and <Hl>Postman</Hl>.
        </p>

        <div className="my-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Featured Projects
          </h2>
          <CardStack />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h3 className="font-semibold text-foreground text-lg">
              Food Delivery Microservices
            </h3>
            <p>
              A production-ready food delivery platform built with Spring Boot microservices,
              Spring Security with JWT, Eureka service discovery, Apache Kafka event streaming,
              and Spring Cloud Gateway.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-lg">
              AI Resume Builder
            </h3>
            <p>
              An AI resume builder that builds and enhances your resume by fetching data
              from GitHub and intelligently filling it up using FastAPI, React, LangChain, and LangGraph.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-lg">
              AI Agent Chatbot
            </h3>
            <p>
              An AI chatbot that integrates with Google and executes your tasks or messages
              across Google Drive, Docs, Calendar, Gmail, Tasks, and Slack.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-lg">
              Banking App
            </h3>
            <p>
              A full-stack banking application built with Java Spring Boot and React, featuring
              secure authentication, fund transfers, balance tracking, and transaction history.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 text-foreground">
          Achievements
        </h2>

        <p>
          Active on LeetCode at <a href="https://leetcode.com/u/AzizReja/" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4 hover:text-primary">AzizReja</a>,
          regularly solving data structures and algorithm challenges.
        </p>

        <h2 className="text-2xl font-bold mt-8 text-foreground">
          Let's Connect
        </h2>

        <p>
          I'm always open to collaborating on backend, distributed systems, AI, or full-stack
          projects—or simply connecting with fellow developers.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="mailto:rejaaziz686@gmail.com">
            <Button variant="outline">
              <Mail className="size-4 mr-2" />
              Email
            </Button>
          </a>

          <a
            href="https://github.com/AzizReja10"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">
              <SiGithub className="size-4 mr-2" />
              GitHub
            </Button>
          </a>

          <a
            href="https://www.linkedin.com/in/aziz-reja-8b916a33a/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">
              <FaLinkedin className="size-4 mr-2" />
              LinkedIn
            </Button>
          </a>

          <a
            href="https://leetcode.com/u/AzizReja/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">
              <SiLeetcode className="size-4 mr-2" />
              LeetCode
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
}