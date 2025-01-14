import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const HowTerms = [
  {
    id: 1,
    term: "Birthday Gifting with no money out of your pocket",
  },
  {
    id: 2,
    term: "Best prices when shopping",
  },
  {
    id: 3,
    term: "Personalized experience when buying",
  },
  {
    id: 4,
    term: "Making money when serving other shoppers",
  },
];

const SummaryTerms = [
  {
    id: 1,
    question: "What do I get?",
    summary:
      "You get $250 to spend on anything you want. This means you can say goodbye to wanting something badly for your birthday but not being able to afford it.",
  },
  {
    id: 2,
    question: "What's the catch?",
    summary:
      "There's no catch! We're on a mission to end hunger, and we believe that by working together, we can make a real difference.",
  },
  {
    id: 3,
    question: "How does it work?",
    summary:
      "You pledge to give $50 e-gifts to 5 friends on their birthdays. In return, they automatically pledge $50 e-gifts back to you. The $250 bonus you get at sign-up covers the $50 gifts you'll give to your 5 friends.",
  },
  {
    id: 4,
    question: "What's in it for BrandLogs?",
    summary:
      "We're creating a cycle of giving that helps feed hungry children. For every $250 we give out, we donate $20 to feed a child in need.",
  },
  {
    id: 5,
    question: "Is it really free?",
    summary: "Yes, it's absolutely free! There are no hidden fees or charges.",
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollArea className="h-[80vh] rounded-md border">
          <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto px-4 py-8 bg-white">
            <h2 className="uppercase text-xl text-green-600 text-center my-8">
              Terms of use
            </h2>
            <div className="">
              <section>
                <p className="mb-6 font-semibold">
                  BRANDLOGS INC. (BRANDLOGS) IS A DELAWARE CORPORATION WITH ITS
                  OFFICES AT 3000 EL CAMINO REAL BUILDING, PALO ALTO, 94306 CA,
                  USA.
                </p>
                <p className="mb-6 tracking-wide">
                  These Terms of Use (the "Terms") govern your (the "User") use
                  of the websites and other online services (collectively,
                  "Services") provided by BrandLogs (or "we"). The Services
                  include, but are not limited to, the website located at{" "}
                  <a
                    href="https://www.myhungerhero.com/"
                    className="text-blue-600 hover:text-red-600"
                  >
                    www.myhungerhero.com
                  </a>
                  , and the $250 Gift Bonus Plus a Cake Giveaway Program.
                </p>

                <p className="mb-6 tracking-tight">
                  PLEASE NOTE THAT THIS IS A BETA VERSION OF THE BRANDLOGS
                  PLATFORM WHICH IS NOT FULLY AUTOMATED AND IS STILL UNDERGOING
                  FINAL TESTING BEFORE ITS OFFICIAL RELEASE. THE PLATFORM AND
                  ALL CONTENT FOUND ON IT ARE PROVIDED ON AN "AS IS" AND "AS
                  AVAILABLE" BASIS. BRANDLOGS DOES NOT GIVE ANY WARRANTIES,
                  WHETHER EXPRESS OR IMPLIED, AS TO THE SUITABILITY OR USABILITY
                  OF THE WEBSITE, OR ANY OF ITS CONTENT.
                </p>
              </section>

              <h3 className="font-semibold text-lg uppercase my-4">Foreword</h3>
              <section>
                <p className="mb-6">
                  Welcome to the Age of Hunger Liberation—a movement that
                  redefines hunger philanthropy for 8 billion people worldwide.
                  The Birthday Hero Challenge leverages peer-to-peer e-gifting
                  during birthdays celebration to create recurring hunger
                  donations that ensure no child goes to bed hungry.
                </p>
              </section>

              <h3 className="font-semibold text-lg uppercase my-4">
                Why birthdays?
              </h3>
              <section>
                <p className="mb-3">
                  It is simple: gifting is an integral part of birthdays—the
                  most celebrated social event globally. Why not channel that
                  into a powerful force for good
                </p>
                <p className="mb-3">
                  <i>
                    Additionally, according to a New York Post publication in
                    2019,
                  </i>{" "}
                  74% or 245 Million Americans buy gifts for others so they can
                  use them, with the current market estimated to be a staggering
                  $162 billion and expected to reach $388 billion by 2027, It's
                  interesting to note while gift-giving is a thriving industry,
                  the contrast is stark when considering the pressing issue of
                  hunger. Hence the Age of Hunger liberation was long overdue!
                </p>

                <h2 className="text-xl capitalize font-bold mt-6 mb-3">
                  how we do it
                </h2>
                <p className="mb-3">
                  We offer a community web platform leveraging peer-to-peer
                  e-gifting during birthday celebrations to gurantee recurring
                  hunger donations to ensure no child goes to bed hungry when
                  users like you and me enjoy:
                </p>
                <ol className="list-decimal pl-6 mb-6">
                  {HowTerms.map((how) => (
                    <li key={how.id} className="mb-2">
                      {how.term}
                    </li>
                  ))}
                </ol>
              </section>

              <h2 className="text-xl capitalize font-bold mt-8 mb-4">
                $250 GIFT BONUS PLUS A CAKE GIVEAWAY REWARD
              </h2>
              <section>
                <p className="mb-3">
                  Brandlogs is running the $250 Gift Bonus plus a Cake Giveaway
                  reward program dubbed Birthday Hero Challenge
                </p>
                <p className="mb-3">
                  Birthday Hero Challenge is a hunger cause advocacy campaign
                  that incentivizes participants with a Gift Bonus Reward of
                  $250 plus a Cake Giveaway to enable them enjoy Birthday
                  Gifting with no money out of their pocket. This means you can
                  say goodbye to wanting something badly for your birthday but
                  not being able to afford it.
                </p>
                <p className="mb-3">
                  Birthday Hero Challenge offers Users the ability to accept a
                  two- way e-gift pledge invitations from family or friends to
                  Get $250 Gift Bonus plus $20 Cake Giveaway Credited in their
                  Gift Wallet.The $250 Gift Bonus plus $20 Cake Giveaway reward
                  is offered at the sole discretion of Brandlogs and is subject
                  to your compliance with these Terms of Use.
                </p>
                <p className="mb-3">
                  Birthday Hero Challenge Reward Campaign will run from 4th of
                  Sept 2024 with a no ending Date.
                </p>
              </section>

              <h3 className="font-semibold text-lg uppercase my-4">summary</h3>
              <section>
                <p className="font-semibold mb-3">
                  To ensure no child goes to bed hungry!
                </p>
                <p className="mb-6">
                  You get $250 to spend on anything you want. This means you can
                  say goodbye to wanting something badly for your birthday but
                  not being able to afford it.
                </p>

                <ol className="space-y-4 mb-6">
                  {SummaryTerms.map((terms) => (
                    <li key={terms.id} className="border-b pb-4">
                      <p className="font-semibold">{terms.question}</p>
                      <p className="mt-2">{terms.summary}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <h3 className="font-semibold capitalize my-4">
                Here is how it works
              </h3>
              <section className="space-y-3 mb-6">
                <div>
                  <p className="font-semibold">Step 1: Sign Up</p>
                  <p>
                    It's free! Accept a friend's or family member's invitation
                    to join a two-way E-gift pledge of $50.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Step 2: Get your bonus</p>
                  <p>Receive $250 in your wallet upon joining.</p>
                </div>
                <div>
                  <p className="font-semibold">Step 3: Pay it forward</p>
                  <p>Pledge to Gift $50 to five friends on their birthdays.</p>
                </div>
                <div>
                  <p className="font-semibold">Step 4: Enjoy your Birthday</p>
                  <p>
                    Use your $250 however you like when your big day comes
                    including transferring the total amount from your wallet to
                    your preferred bank account.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Step 5: Become a Hunger Hero</p>
                  <p>We'll donate $20 to feed a hungry child in your name.</p>
                </div>
              </section>

              <h3 className="font-semibold text-lg uppercase my-4">
                What does this Two-Way E-Gifting Pledge mean?
              </h3>
              <section className="mb-6">
                <p className="mb-3">
                  The two-way e-gifting pledge means you promise to give to your
                  family/friends and they promise to give to you in return.
                  Simple right? So, let's break it down:
                </p>
                <div className="space-y-2 pl-4">
                  <p>
                    • You pledge $50 e-gifts to 5 friends on their birthdays.
                  </p>
                  <p>• They automatically pledge $50 e-gifts back to you.</p>
                  <p>
                    • When your birthday comes, you receive $50 e-gifts from
                    your friends.
                  </p>
                  <p>
                    • The $250 bonus you get at sign-up covers the $50 gifts
                    you'll give to your 5 friends.
                  </p>
                </div>
              </section>

              <h3 className="font-semibold text-lg uppercase my-4">
                The Best Part?
              </h3>
              <section className="mb-6">
                <ul className="space-y-3 pl-4">
                  <li>
                    • This will create a cycle of giving and getting, while also
                    helping us feed millions of hungry children.
                  </li>
                  <li>
                    • You become a "Birthday Hero" by getting celebrated with an
                    award as the Next Humanity's Hunger Hero at Birthday Hero
                    Birthday Fun Festival.
                  </li>
                </ul>
              </section>

              <h3 className="font-semibold text-lg uppercase my-4">
                Cake Giveaways
              </h3>
              <section className="mb-6">
                <p className="mb-3">
                  You get nominated for a cake giveaway to make your upcoming
                  birthday even more meaningful in these five simple steps.
                </p>
                <ul className="space-y-2 pl-4">
                  <li>• Get nominated by our endorsed Cake shops.</li>
                  <li>
                    • Accept the nomination by filling out the link, and
                    providing your email, nomination number, name and birthdate.
                  </li>
                  <li>
                    • Attend your Slated Free Virtual Monthly Birthday Hero
                    Awards and get celebrated as a Hunger Hero!
                  </li>
                  <li>
                    • Receive a $20 cake giveaway reward in your gift wallet.
                  </li>
                  <li>
                    • Exclusively Order and collect your cake from your Nominee
                    Cake Shop during your upcoming birthday.
                  </li>
                </ul>
                <p className="mt-3">
                  Become a Birthday Hero and help ensure no child goes to bed
                  hungry!
                </p>
                <p>And the best part; it's absolutely free!</p>
              </section>

              <p className="mb-6">
                The BETA Version is for early adopters who access the Services
                and enroll in the $250 Gift Bonus plus a Cake Giveaway reward
                Program under the following conditions:
              </p>

              <h3 className="font-semibold text-lg uppercase my-4">
                Terms Of Use
              </h3>
              <section className="mb-6">
                <ol className="space-y-2 pl-4">
                  <li>1. You are not required to pay any sign up fees.</li>
                  <li>
                    2. The Challenge participant is limited to +1 Country Code
                    User only.
                  </li>
                  <li>
                    3. You are required to have +1 Country Code Phone number
                    when you Sign up.
                  </li>
                  <li>
                    4. The Cake Giveaway will be limited to early birds courtesy
                    of nomination by our Endorsed Cakeshop.
                  </li>
                </ol>
              </section>

              <h3 className="font-semibold text-lg uppercase my-4">
                Enrollment
              </h3>
              <section className="mb-6">
                <p className="mb-3">
                  To use the Services and enroll in the $250 Gift Bonus plus a
                  Cake Giveaway reward, you will need to accept your challenge
                  invitation by providing your email address, and birthday date,
                  and enter your first and last name, to create your account.
                  All the information you provide when you create your account
                  must be true, accurate, current, and complete. You are
                  responsible for all activity in your account, so please secure
                  and protect your login information and password.
                </p>
                <p>
                  Subject to these Terms of Use, we hereby grant you a
                  non-exclusive, non-transferable license (without the right to
                  sublicense) to access and use the Services for your personal
                  use to access the $250 gift bonus plus a Cake giveaway reward
                  Program. You agree that you obtain no rights other than the
                  rights and licenses expressly granted in this Agreement.
                  BrandLogs reserves the right to change, upgrade, or
                  discontinue the Program and/or any of the Services and/or any
                  feature of the Program or the Services, at any time, with or
                  without notice. All rights not expressly granted under these
                  Terms of Use are reserved by BrandLogs or its licensors.
                </p>
              </section>

              <h3 className="font-semibold text-lg uppercase my-4">
                Your Content
              </h3>
              <section className="mb-6">
                <p className="mb-3">
                  You may post content, including photos, comments, links,
                  Offers, and other materials on, or using our Services.
                  Anything that you post or otherwise make available on the
                  Services is referred to as "User Content." When you post User
                  Content, you represent and warrant that you have all rights
                  necessary to do so, including but not limited to having
                  sufficient intellectual property rights in the User Content,
                  and that to the best of your knowledge, the User Content
                  complies with all applicable laws
                </p>
                <p className="mb-3">
                  Aside from the limited license described herein, you retain
                  all rights to the User Content. You grant BrandLogs, its
                  affiliates, and its users a perpetual, irrevocable,
                  non-exclusive, royalty-free, transferable, sub-licensable,
                  worldwide license to use, store, display, reproduce, publish,
                  transmit, modify, create derivative works, perform, and
                  distribute your User Content on the Services, and third party
                  sites (e.g., under our account with a social networking site).
                  Nothing in these Terms shall restrict other legal rights
                  BrandLogs may have to User Content. We are not obligated to
                  review or monitor User Content but we reserve the right to
                  remove or modify User Content for any reason, including User
                  Content that we believe violates these Terms or our policies.
                </p>
                <p className="mb-3">
                  We do not guarantee how quickly your User Content will appear
                  on the Services or how and where it will appear. We reserve
                  the exclusive right to describe, categorize, and place Offers
                  in our sole discretion.
                </p>
                <p className="mb-3">
                  Following the termination or deactivation of your account, we
                  will retain and use your account information and any User
                  Content following these Terms and our Privacy Policy.
                </p>
                <p>
                  We value hearing from you and are always interested in
                  learning about ways we can improve the Services. If you choose
                  to submit comments, ideas, or feedback, you agree that we may
                  use them without restriction and without any compensation,
                  attribution, or accounting to you.
                </p>
              </section>

              {/* Continue with the rest of the sections... */}
            </div>
          </article>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Terms;
