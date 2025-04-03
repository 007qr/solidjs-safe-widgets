import type { Component } from "solid-js";
import styles from "./App.module.css";

import BigCard from "./components/BigCard";
import Card from "./components/Card";
import ThreeStepCard from "./components/ThreeStepCard";
import Connect from "./components/icons/Connect";
import TestimonialCard from "./components/TestimonialCard";

const App: Component = () => {
  return (
    <div class="flex h-[300vh] flex-col gap-[60px] items-center justify-center bg-[#F5F5F5]">
      {/* Testimonial Card */}
      <TestimonialCard text="...helped me recover $5K worth of Chargebacks" gifSrc="" videoSrc="" personName="" companyName="" />
      {/* Big Card Example */}
      <BigCard title="We've won loads of Chargebacks. We'll win yours too." />

      {/* Card Example */}
      <Card
        backgroundType="img"
        src="/bg.webp"
        title="Win Your Chargebacks Automatically."
        subTitle="AI-powered automation that fights disputes for you. Stop losing revenue and save time"
        nextButton={true}
      />

      {/* ThreeStepCard Example */}
      <ThreeStepCard
        altText="Follow these steps"
        steps={[
          { id: 1, title: "Connect", subTitle: "Simply connect your stripe, Shopify or other payment providers", icon: <Connect /> },
          { id: 2, title: "Respond", subTitle: "We automatically respond to your customer", icon: "" },
          { id: 3, title: "Win", subTitle: "You win", icon: "" },
        ]}
        nextButton={true}
      />

    </div>
  );
};

export default App;
