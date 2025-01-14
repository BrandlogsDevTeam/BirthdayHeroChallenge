import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HowTerms } from "./items";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollArea className="h-[80vh] rounded-md border">
          <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto px-4 py-8 bg-white">
            <h2 className="uppercase text-xl text-green text-center my-8">
              privacy policy
            </h2>
            <div className="md:ms-20">
              <article>
                We, Brandlogs Inc., a Delaware Corporation with offices in 4
                Palo Alto Square, 3000 El Camino Real Building, 94306, CA
                ("Brandlogs"), are committed to protecting any data that we
                collect concerning you. By using our services you agree to the
                use of the data that we collect following this Privacy Policy.
                The purpose of this Privacy Policy is to enable you to
                understand what personal information of yours is collected, how
                and when we might use or share your information, and how you can
                correct any inaccuracies in the information. This Privacy Policy
                also explains our online information practices and the choices
                you can make about the way your information is collected and
                used.
              </article>

              <h3 className="font-bold text-lg uppercase my-4">
                <ol>
                  <li>about us</li>
                </ol>
              </h3>
              <section>
                <p className="mb-3">
                  We pride ourselves us Birthday Hero community!
                </p>
                <p className="mb-3">
                  Brandlogs offers a community Web platform leveraging
                  peer-to-peer e-gifting during birthday celebrations to
                  guarantee recurring hunger donations to ensure no child goes
                  to Bed Hungry when users like you and me enjoy:
                </p>
                <ol className="list-decimal mb-3">
                  {HowTerms.map((how) => (
                    <li key={how.id} className="ml-6">
                      {how.term}
                    </li>
                  ))}
                </ol>
                <p className="mb-3">
                  Brandlogs was established with the core mission of ending
                  hunger in America and Beyond! By unlocking new gifting
                  possibilities to guarantee recurring hunger donations to feed
                  food-insecure families. The information that BrandLogs
                  collects in connection with its platform and products is
                  hosted on secure servers located in the United States unless
                  otherwise provided.
                </p>
                <p className="mb-3">
                  For how long should 40 million people, including 9 million
                  children, continue facing food insecurity in the United
                  States, where 49 million relied on food banks for assistance
                  in 2022 alone?
                </p>
                <p className="mb-3">
                  The hunger crisis stretches even further.
                </p>
                <p className="mb-3">
                  According to the UN, over 733 million people globally faced
                  hunger in 2023—equivalent to one in every eleven people, and
                  in Africa, it's a staggering one in five. Most of the world's
                  hungry live in sub-Saharan Africa and South Asia. Even more
                  alarming, hunger is rising in other regions like Western Asia
                  and the Caribbean, highlighting an ever-growing problem
                  affecting millions. But hunger is not just about missing
                  meals; it is a deeply entrenched issue that stifles
                  opportunities and keeps communities trapped in cycles of
                  poverty.
                </p>
                <p className="mb-3">Why birthdays?</p>
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
                <p className="mb-3">The Inspiration</p>
                <p className="mb-3">
                  This movement draws inspiration from the lived experiences of
                  Titus Gicharu, founder and CEO of Brandlogs. Having endured
                  hunger as a child during one of Kenya's worst droughts,
                  Titus's journey has fueled his passion for global hunger
                  relief, sparking the Birthday Hero Challenge as his way of
                  giving back.
                </p>
              </section>

              <h3 className="font-bold text-lg uppercase my-4">
                <span>2.</span> <span>information collected</span>
              </h3>
              <section>
                <p className="mb-6">
                  We collect the following types of information from you to
                  provide you with the products and services you purchased and
                  for the purposes described below. We may collect any or all of
                  the information via both automated means such as
                  communications profiles or cookies.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Information and content you provide
                </h4>
                <p className="mb-3">
                  We collect the content, communications, and other information
                  you provide when you use our platform and products, including
                  when you sign up for an account, create or share content, and
                  message or communicate with others. This can include your
                  name, address, telephone number, fax number, and email address
                  and information in or about the content you provide (like
                  metadata), such as the date and time of your diary
                  interactions. It can also include what you see through
                  features we provide so that we can do things like suggest
                  brands that you connect with. Our systems automatically
                  process content and communications you and others provide to
                  analyze context and what's in them for the purposes described
                  below.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Networks and connections
                </h4>
                <p className="mb-3">
                  We collect information about the pages, accounts, and hashtags
                  of brands that you are connected to and how you interact with
                  them across our Products. We have an address book call log or
                  (SMS log history), which we use for things like helping you
                  and others connect with brands you are associated with and for
                  the other purposes listed below.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Information about transactions made on our Products
                </h4>
                <p className="mb-3">
                  If you use our Products for purchases or other financial
                  transactions, we collect information about the purchase or
                  transaction. This includes payment information, such as your
                  credit or debit card number and other card information; other
                  account and authentication information; and billing, shipping,
                  and contact details.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Things others do and information they provide about you
                </h4>
                <p className="mb-3">
                  We also receive and analyze content, communications, and
                  information that other people provide when they use our
                  Products. This can include information about you, such as when
                  others share or comment on your activity, send a message to
                  you, or upload, sync, or import your contact information.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  device information
                </h4>
                <p className="mb-3">
                  As described below, we collect information from and about the
                  computers, phones, connected TVs, and other web-connected
                  devices you use that integrate with our Products, and we
                  combine this information across different devices you use. For
                  example, we use information collected about your use of our
                  Products on your phone to better personalize the content
                  (including ads) or features you see when you use our Products
                  on another device, such as your laptop or tablet, or to
                  measure whether you took an action in response to an ad we
                  showed you on your phone on a different device
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  cookies and tracking
                </h4>
                <p className="mb-3">
                  Your Internet browser has the built-in facility for storing
                  small text files - "cookies" - that hold information that
                  allows a website to recognize your account. We use cookies to
                  save your preferences and login information and to provide
                  personalized functionality. We may use cookies to collect,
                  store, and sometimes track information for statistical
                  purposes to improve the products and services we provide and
                  to manage our telecommunications networks. More specifically,
                  we use different types of cookies for different purposes: (i)
                  "required cookies" are necessary for our website to work
                  properly, (ii) "performance cookies" allow us to analyze how
                  visitors use our website so we can measure and improve the
                  performance of our website, (iii) "functional cookies" allow
                  us to remember choices you may have made on our website, and
                  (iv) "advertising cookies" are used to present ads that are
                  relevant to your interests. We may utilize cookies to track
                  referrals from internal and external affiliates, as well as
                  advertising campaigns. We may also use a third-party service
                  provider to send emails that you have agreed to receive. Pixel
                  tags and cookies may be used in those email messages to help
                  us measure the effectiveness of our advertising and to enable
                  us to provide more focused marketing communications to you.
                  You can reject cookies by changing your browser settings, but
                  be aware that this will disable some of the functionality on
                  our website.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  customer surveys
                </h4>
                <p className="mb-3">
                  We may periodically conduct customer surveys. Participation in
                  our customer surveys is voluntary. However, we encourage our
                  Users to participate in these surveys because they provide us
                  with important information that helps us improve the types of
                  products we offer and how we provide them to you. Your
                  personal information, if provided, will remain confidential,
                  even if the survey is conducted by a third-party service
                  provider on our behalf.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  social media
                </h4>
                <p className="mb-3">
                  Our website includes social media features (such as the
                  Facebook "Like" button). These features may collect your IP
                  address and which page you are visiting on our website, and
                  may set a cookie to enable the feature to function properly.
                  Social media features and widgets may be hosted by a third
                  party or directly on our website. Your interactions with these
                  features are governed by the privacy policy of the company
                  providing the feature.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Data and Information Submitted to Third Parties on Our Network
                </h4>
                <p className="mb-3">
                  This Privacy Policy does not apply to data or personal
                  information that may be submitted to, or collected by,
                  third-party websites connected to our products. Such websites
                  and domain names are not owned or controlled by BrandLogs. You
                  should independently evaluate the privacy policies of such
                  third-party websites before submitting data or personal
                  information to them.
                </p>
              </section>

              <h3 className="font-bold text-lg uppercase my-4">
                <span>3.</span> <span>information use</span>
              </h3>
              <section>
                <p className="mb-6">
                  We use the information we have (subject to the choices you
                  make) as described below to provide and support the Facebook
                  Products and related services.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Provide, personalize, and improve our Products.
                </h4>
                <p className="mb-3">
                  We use the information we have to deliver our Products,
                  including to personalize features and content (including your
                  feed and ads) and make suggestions for you (such as brands you
                  may be interested in or topics you may want to follow) on and
                  off our Products. To create personalized Products that are
                  unique and relevant to you, we use your connections,
                  preferences, interests, and activities based on the data we
                  collect and learn from you and others (including any data with
                  special protections you choose to provide); how you use and
                  interact with our Products; and the people, places, or things
                  you're connected to and interested in on and off our Products.
                  Learn more about how we use information about you to
                  personalize and how people interact with their websites, apps,
                  and services.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Promote safety, integrity, and security
                </h4>
                <p className="mb-3">
                  your Brandlogs experience, including features, content, and
                  recommendations in BrandLogs Products; you can also learn more
                  about how we choose the ads you see. We use location-related
                  information such as your current location, where you live, the
                  places you like to go, and the businesses and people you're
                  near to to provide, personalize, and improve our Products,
                  including ads, for you and others. Location-related
                  information can be based on things like precise device
                  location (if you've allowed us to collect it), and IP
                  addresses. We use the information we have to develop, test,
                  and improve our Products, including by conducting surveys and
                  research, and testing and troubleshooting new products and
                  features. We use the information we have about you-including
                  information about your interests, actions, and connections to
                  select and personalize ads, offers, and other sponsored
                  content that we show you.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Provide measurement, analytics, and other business services
                </h4>
                <p className="mb-3">We use the information</p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Provide measurement, analytics, and other business services
                </h4>
                <p className="mb-3">
                  We use the information we have (including your activity of our
                  Products, such as the websites you visit and ads you see) to
                  help advertisers and other partners measure the effectiveness
                  and distribution of their ads and services and understand the
                  types of people who use their services We use the information
                  we have to verify accounts and activity, combat harmful
                  conduct, detect and prevent spam and other bad experiences,
                  maintain the integrity of our Products, and promote safety and
                  security on and off of Brandlogs Products. For example, we use
                  data we have to investigate suspicious activity or violations
                  of our terms or policies, or to detect when someone needs
                  help.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Communicate with you.
                </h4>
                <p className="mb-3">
                  We use the information we have to send you marketing
                  communications, communicate with you about our Products, and
                  let you know about our policies and terms. We also use your
                  information to respond to you when you contact us.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Research and innovate for social good.
                </h4>
                <p className="mb-3">
                  We use the information we have (including from research
                  partners we collaborate with) to conduct and support research
                  and innovation on topics of general social welfare,
                  technological advancement, public interest, health, and
                  well-being.
                </p>
              </section>

              <h3 className="font-bold text-lg uppercase my-4">
                <span>4.</span> <span>disclosing information</span>
              </h3>
              <section>
                <p className="mb-6">
                  Your information is shared with others in the following ways:
                </p>

                <h4 className="font-semibold text-base capitalize my-2">
                  sharing on the brandlogs platform
                </h4>
                <h4 className="font-semibold text-base capitalize my-2">
                  People and accounts you share and communicate with
                </h4>
                <p className="mb-3">
                  When you share and communicate using our Products, you choose
                  the audience for what you share. For example, when you log on
                  to the date and time of your day-to-day diary interactions,
                  you select the events and brands you are interested in so that
                  you integrate them into connection pools to generate brand
                  visibility to mass audiences.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Content others share or reshare about you
                </h4>
                <p className="mb-3">
                  Consider who you choose to share with, because people who can
                  see your activity on our Products can choose to share it with
                  others on and off our Products, including people and
                  businesses outside the audience you shared with. For example,
                  when you share a post a date, or an event with specific
                  people, brands, or accounts, they can download, screenshot, or
                  reshare that content to others across or off our Products.
                  Also, when you comment on someone else's post or react to
                  their content, your comment or reaction is visible to anyone
                  who can see the other person's content, and that person can
                  change the audience later. People can also use our Products to
                  create and share content about you with the audience they
                  choose. For example, a brand interested in your content can
                  mention or tag you at a location or event in a post, or share
                  information about you in their posts or messages. If you are
                  uncomfortable with what others have shared about you on our
                  Products, you can report the content to us.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Information about your active status or presence on our
                  Products.
                </h4>
                <p className="mb-3">
                  People in your networks can see signals telling them whether
                  you are active on our Products, including whether you are
                  currently active on BrandLogs, or when you last used our
                  Products.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Apps, websites, and third-party integrations on or using our
                  Products.
                </h4>
                <p className="mb-3">
                  When you choose to use third-party apps, websites, or other
                  services that use, or are integrated with our Products, they
                  can receive information about what you post or share.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  New owner.
                </h4>
                <p className="mb-3">
                  If the ownership or control of all or part of our Products or
                  their assets changes, we may transfer your information to the
                  new owner.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Sharing with Third-Party Partners
                </h4>
                <p className="mb-3">
                  We work with third-party partners who help us provide and
                  improve our Products or who use Brandlogs Tools to grow their
                  businesses, making it possible to operate our companies and
                  provide free services to people worldwide. We don't sell any
                  of your information to anyone, and we never will. We also
                  impose strict restrictions on how our partners can use and
                  disclose the data we provide. Here are the types of third
                  parties we share information with:
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Partners who use our analytics services.Research and innovate
                  for social good.
                </h4>
                <p className="mb-3">
                  We provide aggregated statistics and insights that help people
                  and businesses understand how people are engaging with their
                  posts, listings, Pages, videos, and other content on and off
                  the BrandLogs Products. For example, Brands receive
                  information about the number of people or accounts who viewed,
                  reacted to, or commented on their posts, and events as well as
                  aggregate demographic and other information that helps them
                  understand interactions with their brands or accounts.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Advertisers.
                </h4>
                <p className="mb-3">
                  We provide advertisers with reports about the kinds of people
                  seeing their ads and how their ads are performing, but we
                  don't share information that personally identifies you
                  (information such as your name or email address that by itself
                  can be used to contact you or identifies who you are) unless
                  you permit us. For example, we provide general demographic and
                  interest information to advertisers (for example, that an ad
                  was seen by a woman between the ages of 20 and 35) to help
                  them better understand their audience. We also confirm which
                  BrandLogs ads led you to make a purchase or take action with
                  an advertiser.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Measurement partners..
                </h4>
                <p className="mb-3">
                  We share information about you with companies that aggregate
                  it to provide analytics and measurement reports to our
                  partners.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Partners offering goods and services in our Products.
                </h4>
                <p className="mb-3">
                  When you subscribe to receive premium content or buy something
                  from a seller in our Products, the content creator or seller
                  can receive your public information and other information you
                  share with them, as well as the information needed to complete
                  the transaction, including shipping and contact details.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Vendors and service providers.
                </h4>
                <p className="mb-3">
                  We provide information and content to vendors and service
                  providers who support our business, such as by providing
                  technical infrastructure services, analyzing how our Products
                  are used, providing customer service, facilitating payments,
                  or conducting surveys
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Researchers and academics.
                </h4>
                <p className="mb-3">
                  We also provide information and content to research partners
                  and academics to conduct research that advances scholarship
                  and innovation that support our business or mission and
                  enhances discovery and innovation on topics of general social
                  welfare, technological advancement, public interest, health,
                  and well-being.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Law Enforcement and Special Cases
                </h4>
                <p className="mb-3">
                  We cooperate with government and law enforcement officials to
                  enforce and comply with the law. We will disclose any
                  information about users upon a valid request by government or
                  law officials as we, in our sole discretion, believe necessary
                  or appropriate to respond to claims and legal processes to
                  protect your property and rights, or the property and rights
                  of a third party, to protect the safety of the public or any
                  person, or to stop the activity that we consider illegal or
                  unethical.
                </p>
              </section>

              <h3 className="font-bold text-lg uppercase my-4">
                <span>5.</span> <span>your options</span>
              </h3>
              <section>
                <h4 className="font-semibold text-base capitalize my-2">
                  We are correcting/Updating Personal Information.
                </h4>
                <p className="mb-3">
                  If a customer's information changes, or if a customer no
                  longer desires our services, we will endeavor to provide a way
                  to correct, update, or remove that customer's data from our
                  records.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Opt-Out
                </h4>
                <p className="mb-3">
                  By default, customers will receive invoices, system updates,
                  BrandLogs newsletters, and other mailings(if any). Customers
                  can opt out of newsletters and mailings by using the
                  unsubscribe link in any promotional email or as otherwise
                  provided in the communication. Please note that customers may
                  not opt out of receiving important system notifications or
                  emails about their accounts.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Public Forums
                </h4>
                <p className="mb-3">
                  Please remember that any information you may disclose or post
                  on public areas of our websites or the Internet becomes public
                  information. You should exercise caution when disclosing
                  personal information in these public areas. To request the
                  removal of your personal information from our community forums
                  or testimonials, contact us. In some cases, we may not be able
                  to remove your personal information, in which case we will let
                  you know why we are unable to do so.
                </p>
              </section>

              <h3 className="font-bold text-lg uppercase my-4">
                <span>6.</span> <span>data security</span>
              </h3>
              <section>
                <p className="mb-6">
                  BrandLogs uses technical security measures to prevent the
                  loss, misuse, alteration, or unauthorized disclosure of
                  information under our control. BrandLogs uses security
                  measures including but not limited to physical, electronic,
                  and managerial procedures to safeguard and secure the
                  information we collect online. All sensitive information is
                  collected on a secure server. When we ask customers or users
                  to provide financial information (such as a credit card
                  number) that data is protected using Secure Sockets Layer
                  ("SSL") technology.
                </p>
              </section>
              <h3 className="font-bold text-lg uppercase my-4">
                <span>7.</span> <span>Children</span>
              </h3>
              <section>
                <p className="mb-6">
                  This website is not directed towards children and we do not
                  seek to collect any personal information from children. If we
                  become aware that personal information from a child under the
                  age of 13 has been collected, we will use all reasonable
                  efforts to delete such information from our database.
                </p>
              </section>
              <h3 className="font-bold text-lg uppercase my-4">
                <span>8.</span> <span>Reseller Relationships</span>
              </h3>
              <section>
                <p className="mb-6">
                  In addition to all of the terms and conditions set forth
                  above, the following terms apply to Reseller relationships
                  only.
                </p>

                <h4 className="font-semibold text-base capitalize my-2">
                  Information Related to Data Collected through Resellers.
                </h4>
                <p className="mb-3">
                  BrandLogs may collect information under the direction of our
                  Resellers, and we have no direct relationship with the
                  individuals whose personal data is provided, processed, or
                  obtained by our Resellers. Customers who seek access, or who
                  seek to correct, amend, or delete inaccurate data should
                  direct their query to the Reseller's data controller. If the
                  Reseller requests that we remove the data, we will respond to
                  such request within thirty (30) business days.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Choice
                </h4>
                <p className="mb-3">
                  If you are a customer of one of our Resellers and would no
                  longer like to be contacted by such resellers, please contact
                  the Reseller from whom you purchased products or services.
                </p>
                <h4 className="font-semibold text-base capitalize my-2">
                  Data Retention
                </h4>
                <p className="mb-3">
                  We retain personal data we process on behalf of our Resellers
                  for as long as needed to provide services under the
                  relationship. We will retain and use this personal information
                  as necessary to comply with our legal obligations, resolve
                  disputes, and enforce our agreements.
                </p>
              </section>
              <h3 className="font-bold text-lg uppercase my-4">
                <span>9.</span> <span>Changes to this Policy</span>
              </h3>
              <section>
                <p className="mb-6">
                  We reserve the right to revise, amend, or modify this Privacy
                  Policy at any time and in any manner. However, if we plan to
                  materially change how we plan to use previously collected
                  personal information, we will provide you with advance notice
                  before the change becomes effective and an opportunity to opt
                  out of such differing uses. We encourage you to periodically
                  review this page for the latest information on our privacy
                  practices.
                </p>
              </section>
            </div>
          </article>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
