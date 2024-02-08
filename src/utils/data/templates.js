import FacebookIcon from "../../assets/images/facebook.png";
import InstagramIcon from "../../assets/images/Instagram.png";
import TextIcon from "../../assets/images/textIcon.jpg";
import EmailIcon from "../../assets/images/emailIcon.png";
import GoogleIcon from "../../assets/images/Google_Ads.png";
import AmazonIcon from "../../assets/images/Amazon.png";
import BusinessNameGen from "../../assets/images/business-name-gen.jfif";
import ThreadsIcon from "../../assets/images/threads.jpg";
import ExplainChildIcon from "../../assets/images/explain.png";
import TranslateIcon from "../../assets/images/translate.png";
import ProposalWriterIcon   from "../../assets/images/proposal-writer.png";
import LinkedInIcon   from "../../assets/images/linkedin-icon.png";
import SentenceExpandIcon   from "../../assets/images/sentence-expander.png";
import AidaIcon   from "../../assets/images/aida.png";
import TextSummarizerIcon   from "../../assets/images/text-summ.png";
import ContentImproverIcon   from "../../assets/images/content-imp.png";
import ReviewRespoIcon   from "../../assets/images/review-respo.png";
import SurveyIcon   from "../../assets/images/survey.png";
import PasIcon   from "../../assets/images/pas.jpg";
import BioIcon   from "../../assets/images/bio.png";
import FaqIcon   from "../../assets/images/faq.png";
import StoryIcon   from "../../assets/images/story.png";
import MetaDescIcon   from "../../assets/images/meta.jpg";
import ShortBlogIcon   from "../../assets/images/short-blog.png";
import BlogIntroIcon   from "../../assets/images/blog-intro.png";
import BlogIdeasIcon   from "../../assets/images/blog-ideas.png";
import BlogOutlineIcon   from "../../assets/images/blog-outline.png";
import ParagraphIcon   from "../../assets/images/paragraph.png";
import GuestEmailIcon from "../../assets/images/gp-email.png";
import WelcomEmailIcon from "../../assets/images/welcom-email.jpg";
import TwitterIcon from "../../assets/images/twitter.png";
import AbCartEmail from "../../assets/images/abond-cart-email.png";
import EventInviteEmail from "../../assets/images/event-invite.png";
import CompArticle from "../../assets/images/comp-article.png";
import KwIcon from "../../assets/images/kw.png";
import ProdRev from "../../assets/images/prod-rev.png";


export const templatesData = [
  {
    template_id: "top-10-products-review",
    title: "Top 10 Products Review",
    icon: ProdRev,
    category: ["Affiliate Marketing"],
    description:
      "Curate a list of the top 10s in minutes.",
    inputs: [
      {
        type: "text",
        name: "topic",
        title: "Topic",
        placeholder: "Enter the topic ",
        "max-length": 130,
        required: true,
      },
      {
        type: "text",
        name: "audience",
        title: "Audience",
        placeholder: "Enter the target audience",
        "max-length": 130,
        required: true,
      },
    ],
  },
  {
    template_id: "keyword-extractor",
    title: "Keyword Extractor",
    icon: KwIcon,
    category:["SEO"],
    description:
      "Analyze keyword distribution and usage on any webpage",
    inputs: [
      {
        type: "text",
        name: "url",
        title: "URL",
        placeholder: "E.g. https://www.example.com",
        "max-length": 240,
        required: true,
      },
     
    ],
  },
  {
    template_id: "comparison-article",
    title: "Comparison Article",
    icon: CompArticle,
    category:[ "Product Marketing", "Affiliate Marketing"],
    description:
      "Compare two products/services & write an article in minutes",
    inputs: [
      {
        type: "text",
        name: "url1",
        title: "First Product/Service",
        placeholder: "Enter the url",
        "max-length": 160,
        required: true,
      },
      {
        type: "text",
        name: "url2",
        title: "Second Product/Service",
        placeholder: "Enter the url",
        "max-length": 160,
        required: true,
      },
    ],
  },
  {
    template_id: "event-invite-email",
    title: "Event Invite Email",
    icon: EventInviteEmail,
    category:[ "Email Marketing"],
    description:
      "Invite participants with exciting event emails",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Enter company name here",
        "max-length": 120,
        required: true,
      },
      {
        type: "textarea",
        name: "company_descp",
        title: "Company Description",
        placeholder: "Describe your company or service",
        "max-length": 2000,
        required: true,
      },
      {
        type: "textarea",
        name: "event_descp",
        title: "Event Description",
        placeholder: "Describe your event",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "event_type",
        title: "Event Type",
        placeholder: "E.g. In-person",
        "max-length": 200,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "abandoned-cart-email",
    title: "Abandoned Cart Email",
    icon: AbCartEmail,
    category:[ "Email Marketing"],
    description:
      "Entice potential buyers into paying customers with an abandoned cart email.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Enter company name here",
        "max-length": 120,
        required: true,
      },
      {
        type: "textarea",
        name: "company_descp",
        title: "Description",
        placeholder: "Describe your company or service",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
      {
        type: "text",
        name: "offer",
        title: "Offer",
        placeholder: "Enter offer",
        "max-length": 150,
        required: true,
      },
    ],
  },
  {
    template_id: "twitter-post",
    title: "Twitter Post",
    icon: TwitterIcon,
    category:["Social Media Marketing"],
    description:
      "Write a well-structured Twitter post to boost engagement.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Enter company name here",
        "max-length": 120,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "instagram-post",
    title: "Instagram Post",
    icon: InstagramIcon,
    category:["Social Media Marketing"],
    description:
      "Write a well-structured Instagram post to boost engagement",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Describe your company or service",
        "max-length": 120,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Describe briefly what this post is about",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "guest-post-email",
    title: "Guest Post Email",
    icon: GuestEmailIcon,
    category:[ "Email Marketing", "SEO", "Affiliate Marketing"],
    description:
      "Write a compelling email for winning guest post opportunities",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Enter company name here",
        "max-length": 120,
        required: true,
      },
      {
        type: "textarea",
        name: "company_descp",
        title: "Description",
        placeholder: "Enter the description",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "external_res",
        title: "External Res",
        placeholder: "Enter external res",
        "max-length": 150,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
     
    ],
  },
  {
    template_id: "welcome-email",
    title: "Welcome Email",
    icon: WelcomEmailIcon,
    category:[ "Email Marketing"],
    description:
      "Welcome new customers or subscribers with a warm value-rich email.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Enter company name here",
        "max-length": 120,
        required: true,
      },
      {
        type: "textarea",
        name: "company_descp",
        title: "Description",
        placeholder: "Describe your company or service",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
      {
        type: "text",
        name: "audience",
        title: "Audience",
        placeholder: "Define target audience here",
        "max-length": 150,
        required: true,
      },
    ],
  },
  {
    template_id: "facebook-post",
    title: "Facebook Post",
    icon: FacebookIcon,
    category:["Social Media Marketing"],
    description:
      "Write a well-structured Facebook post to boost engagement.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Enter your company or service",
        "max-length": 120,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Describe briefly what this post is about",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "linkedin-post",
    title: "LinkedIn Post",
    icon: LinkedInIcon,
    category:["Social Media Marketing"],
    description:
      "Boost engagement with compelling LinkedIn posts.",
    inputs: [
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Describe briefly what this post is about",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "sentence-expander",
    title: "Sentence Expander",
    icon: SentenceExpandIcon,
    category:[ "Content Writing"],
    description:
      "Expand short sentences into longer, more descriptive sentences.",
    inputs: [
      {
        type: "textarea",
        name: "sentence",
        title: "Sentence",
        placeholder: "Enter the sentence",
        "max-length": 4000,
        required: true,
      },
    ],
  },
  {
    template_id: "proposal-writer",
    title: "Proposal Writer",
    icon: ProposalWriterIcon,
    category:[ "Content Writing", "Product Marketing", "Digital Marketing"],
    description:
      "Boost engagement with Twitter threads based on a brief description.",
    inputs: [
      {
        type: "textarea",
        name: "job_descp",
        title: "Job Description",
        placeholder: "Enter the job description",
        "max-length": 5000,
        required: true,
      },
      {
        type: "textarea",
        name: "skills",
        title: "Skills",
        placeholder: "Enter skills",
        "max-length": 1000,
        required: true,
      },
      {
        type: "textarea",
        name: "projects",
        title: "Projects",
        placeholder: "Enter projects",
        "max-length": 1000,
        required: true,
      },
      {
        type: "textarea",
        name: "awards",
        title: "Awards",
        placeholder: "Enter awards",
        "max-length": 1000,
        required: true,
      },
    ],
  },
  {
    template_id: "tweet-machine",
    title: "Twitter Threads",
    icon: ThreadsIcon,
    category:["Social Media Marketing"],
    description:
      "Boost engagement with Twitter threads based on a brief description.",
    inputs: [
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Describe briefly what this post is about",
        "max-length": 2000,
        required: true,
        tooltip:
          "Either paste a section of a blog post, or any other document or write a description about the topic for which you wish to generate the thread.",
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "translate",
    title: "Language Translator",
    icon: TranslateIcon,
    category:[ "Content Writing"],
    description: "Translate any text into 45+ languages.",
    inputs: [
      {
        type: "textarea",
        name: "text",
        title: "Text",
        placeholder: "Enter the text",
        "max-length": 3000,
        required: true,
      },
      {
        type: "text",
        name: "language",
        title: "Language",
        placeholder: "Enter the language here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "explain-to-a-child",
    title: "Explain To Child",
    icon: ExplainChildIcon,
    category:[ "Content Writing"],
    description:
      "Transform complex ideas into easy-to-understand explanations.",
    inputs: [
      {
        type: "textarea",
        name: "text",
        title: "Text",
        placeholder: "Enter the text",
        "max-length": 4000,
        required: true,
      },
    ],
  },
  {
    template_id: "google-ads-description",
    title: "Google Ads Description",
    icon: GoogleIcon,
    category:["Social Media Marketing"],
    description:
      "Write powerful descriptions for Google Ads to boost conversions.",
    inputs: [
      {
        type: "text",
        name: "product",
        title: "Product",
        placeholder: "Enter the product name here",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description",
        "max-length": 2000,
        required: true,
        tooltip:
          "Add further information about the product or service you wish to promote.",
      },
      {
        type: "textarea",
        name: "intent",
        title: "Intent",
        placeholder: "Enter the intent",
        "max-length": 2000,
        required: true,
        tooltip:
          "Here you can define the intention behind running this ad. Example: To increase website visitors, etc.",
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "google-ads-headline",
    title: "Google Ads Headline",
    icon: GoogleIcon,
    category:["Social Media Marketing"],
    description:
      "Boost click-through rates with powerful & engaging Google Ads headlines.",
    inputs: [
      {
        type: "text",
        name: "product",
        title: "Product",
        placeholder: "Enter the product name here",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description",
        "max-length": 2000,
        required: true,
        tooltip:
          "Add further information about the product or service you wish to promote. ",
      },
      {
        type: "textarea",
        name: "intent",
        title: "Intent",
        placeholder: "Enter the intent",
        "max-length": 2000,
        required: true,
        tooltip:
          "Here you can define the intention behind running this ad. Example: To increase website visitors, etc.",
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "business-name-generator",
    title: "Business Name Generator",
    icon: BusinessNameGen,
    category:[ "Product Marketing"],
    description: "Generate meaningful business names for your next venture.",
    inputs: [
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "kw",
        title: "Keywords",
        placeholder: "Enter keywords",
        "max-length": 200,
        required: true,
      },
    ],
  },
  {
    template_id: "amazon-product-description",
    title: "Amazon Product Description",
    icon: AmazonIcon,
    category:[ "Product Marketing"],
    description:
      "Generate meaningful and enticing product descriptions for Amazon.",
    inputs: [
      {
        type: "text",
        name: "product",
        title: "Product",
        placeholder: "Enter the product name here",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description",
        "max-length": 2000,
        required: true,
        tooltip:
          "Here you can add further information about the product. It could be plain text, or bullet points or both.",
      },
      {
        type: "text",
        name: "audience",
        title: "Audience",
        placeholder: "Define target audience here",
        "max-length": 100,
        required: true,
      },
    ],
  },
  {
    template_id: "amazon-product-features",
    title: "Amazon Product Features",
    icon: AmazonIcon,
    category:[ "Product Marketing"],
    description:
      "Generate a product features list that makes your product stand out.",
    inputs: [
      {
        type: "text",
        name: "product",
        title: "Product",
        placeholder: "Enter the product name here",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description",
        "max-length": 2000,
        required: true,
        tooltip: `Add features of your product here. It can be plain text or bullet points.\n 
        Example:\n  
        Up to 8 hours of long-lasting rechargeable battery.\n
        200g light-weight frame\n
        USB 3.0 connectivity
        `,
      },
    ],
  },

  {
    template_id: "blog-post-intro",
    title: "Blog Post Introduction",
    icon: BlogIntroIcon,
    description:
      "Start any blog post with a compelling and creative introduction.",
    category:[ "Content Writing"],
    inputs: [
      {
        type: "text",
        name: "title",
        title: "Blog title",
        placeholder: "Blog title",
        "max-length": 250,
        required: true,
      },
      {
        type: "text",
        name: "audience",
        title: "Audience",
        placeholder: "Define your audience, E.g. Home owners",
        "max-length": 250,
        required: false,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter tone",
        "max-length": 150,
        required: true,
      },
    ],
  },
  {
    template_id: "blog-topic-ideas",
    title: "Blog Post Ideas",
    icon: BlogIdeasIcon,
    description: "Brainstorm countless ideas for the next post for your blog.",
    category:[ "Content Writing", "SEO", "Affiliate Marketing"],
    inputs: [
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter description here",
        "max-length": 2000,
        required: true,
      },
      {
        type: "textarea",
        name: "action",
        title: "Action",
        placeholder: "Action",
        "max-length": 2000,
        required: false,
      },
      {
        type: "text",
        name: "audience",
        title: "Audience",
        placeholder: "Define your audience, E.g. Home owners",
        "max-length": 250,
        required: false,
      },
    ],
  },
  {
    template_id: "blog-post-outline",
    title: "Blog Post Outline",
    category:[ "Blog Templates", "Affiliate Marketing"],
    icon: BlogOutlineIcon,
    category:[ "Content Writing"],
    description: "Generate relevant and creative blog post outlines.",
    inputs: [
      {
        type: "text",
        name: "title",
        title: "Blog title",
        placeholder: "Enter your blog title here",
        "max-length": 500,
        required: true,
      },
      {
        type: "text",
        name: "audience",
        title: "Audience",
        placeholder: "Define target audience here",
        "max-length": 200,
        required: true,
      },
    ],
  },
  {
    template_id: "paragraph-generator",
    title: "Paragraph Generator",
    icon: ParagraphIcon,
    category:[ "Content Writing", "Digital Marketing"],
    description: "Generate paragraphs on a given topic or keyword.",
    inputs: [
      {
        type: "text",
        name: "topic",
        title: "Topic",
        placeholder: "Enter your topic here",
        "max-length": 500,
        required: true,
      },
      {
        type: "text",
        name: "kw",
        title: "Keywords",
        placeholder: "Define your keywords here. Separate them with comma.",
        "max-length": 250,
        required: false,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter tone",
        "max-length": 250,
        required: false,
      },
    ],
  },
  {
    template_id: "cold-email",
    title: "Cold Email",
    icon: EmailIcon,
    category:[ "Email Marketing"],
    description: "Write enticing emails to boost the response rate.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Enter your company name here",
        "max-length": 500,
        required: true,
      },
      {
        type: "text",
        name: "action",
        title: "Action",
        placeholder: "Action",
        "max-length": 250,
        required: false,
        tooltip:
          "What you wish to achieve with this email. Example: to introduce to our latest project management product features. ",
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Tone",
        "max-length": 2000,
        required: false,
      },
      {
        type: "text",
        name: "recepient",
        title: "Recepient",
        placeholder: "Enter name of the recepient",
        "max-length": 500,
        required: true,
      },
      {
        type: "textarea",
        name: "product",
        title: "Product",
        placeholder: "Enter product description",
        "max-length": 2000,
        required: false,
        tooltip:
          "Add further information about the actual product or service you wish to talk about in this email. ",
      },
      {
        type: "text",
        name: "proposition",
        title: "Proposition",
        placeholder: "Proposition",
        "max-length": 250,
        required: false,
        tooltip:
          "Any offer or incentive you wish to include in the email. Example: 20% discount for the next three months",
      },
      {
        type: "text",
        name: "sender",
        title: "Sender",
        placeholder: "Enter name of sender",
        "max-length": 250,
        required: false,
      },
    ],
  },

  {
    template_id: "commands",
    title: "Commands",
    icon: TextIcon,
    category:[ "Content Writing", "Email Marketing", "Product Marketing","Affiliate Marketing", "SEO", "Digital Marketing", "Social Media Marketing"],
    description: "Generate anything with easy-to-use commands.",
    inputs: [
      {
        type: "textarea",
        name: "context",
        title: "Context",
        placeholder: "Context",
        "max-length": 2000,
        required: true,
        tooltip:
          "Add background information, facts, or examples you wish to include in the final response.",
      },
      {
        type: "textarea",
        name: "command",
        title: "Command",
        placeholder: "Command",
        "max-length": 2000,
        required: false,
        tooltip:
          "Write a direct command here for whatever objective you have in mind.",
      },
    ],
  },
  {
    template_id: "text-summarizer",
    title: "Text Summarizer",
    icon: TextSummarizerIcon,
    category:[ "Content Writing"],
    description: "Summarize long texts into concise and informative summaries.",
    inputs: [
      {
        type: "textarea",
        name: "text",
        title: "Text",
        placeholder: "Enter the text here",
        "max-length": 2000,
        required: true,
      },
    ],
  },
  {
    template_id: "content-improver",
    title: "Content Improver",
    icon: ContentImproverIcon,
    category:[ "Content Writing", "Email Marketing","Digital Marketing", "SEO", "Affiliate Marketing" ],
    description: "Enhance the quality and readability of any content.",
    inputs: [
      {
        type: "textarea",
        name: "text",
        title: "Text",
        placeholder: "Enter the text here",
        "max-length": 1000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone",
        "max-length": 1000,
        required: true,
      },
    ],
  },
  {
    template_id: "customer-review-responder",
    title: "Customer Review Responder",
    icon: ReviewRespoIcon,
    category:[ "Product Marketing", "Social Media Marketing"],
    description: "Generate effective responses to customer reviews.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Describe your company or service",
        "max-length": 200,
        required: true,
      },
      {
        type: "texarea",
        name: "company_desc",
        title: "Company Description",
        placeholder: "Enter the company description here",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "reviewer_name",
        title: "Reviewer Name",
        placeholder: "Enter the reviewer name here",
        "max-length": 200,
        required: true,
      },
      {
        type: "text",
        name: "rating",
        title: "Rating",
        placeholder: "Enter the rating here",
        "max-length": 2,
        required: true,
      },
      {
        type: "textarea",
        name: "offer",
        title: "Offer",
        placeholder: "Enter the offer here",
        "max-length": 2000,
        required: true,
      },
      {
        type: "textarea",
        name: "review",
        title: "Review",
        placeholder: "Enter the review here",
        "max-length": 800,
        required: true,
      },
    ],
  },
  {
    template_id: "survey-responses-to-testimonial",
    title: "Survey to Review",
    icon: SurveyIcon,
    category:[ "Product Marketing"],
    description:
      "Convert survey responses into a well-structured customer review.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Describe your company or service",
        "max-length": 200,
        required: true,
      },
      {
        type: "text",
        name: "company_type",
        title: "Company Type",
        placeholder: "E.g. online pet store or marketing agency",
        "max-length": 200,
        required: true,
        tooltip:
          "Example: Online store, restaurant, dental clinic, financial app, etc",
      },
      {
        type: "textarea",
        name: "survey",
        title: "Survey",
        placeholder: "Enter the survey here",
        "max-length": 500,
        required: true,
      },
    ],
  },
  {
    template_id: "video-script-generator",
    title: "YouTube Video Script",
    icon: TextIcon,
    category:[ "Product Marketing", "Social Media Marketing"],
    description: "Generate a verbose script for explainer videos for YouTube.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Describe your company or service",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description here",
        "max-length": 1000,
        required: true,
      },
      {
        type: "text",
        name: "audience",
        title: "Audience",
        placeholder: "Enter your audience here",
        "max-length": 150,
        required: true,
      },
      {
        type: "text",
        name: "cta",
        title: "CTA",
        placeholder: "Enter CTA here",
        "max-length": 150,
        required: true,
      },
    ],
  },
  {
    template_id: "pas-framework",
    title: "PAS Framework",
    icon: PasIcon,
    category:[ "Digital Marketing"],
    description:
      "Create a marketing message using the Problem-Agitate-Solution framework.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Describe your company or service",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description here",
        "max-length": 1000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter your tone here",
        "max-length": 150,
        required: true,
      },
    ],
  },
  {
    template_id: "aida-framework",
    title: "AIDA Framework",
    icon: AidaIcon,
    category:[ "Digital Marketing"],
    description:
      "Create a marketing message using the Attention-Interest-Desire-Action framework.",
    inputs: [
      {
        type: "text",
        name: "company",
        title: "Company",
        placeholder: "Describe your company or service",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description here",
        "max-length": 1000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter your tone here",
        "max-length": 150,
        required: true,
      },
    ],
  },
  {
    template_id: "blog-post",
    title: "Short Blog Post",
    icon: ShortBlogIcon,
    category:[ "Content Writing"],
    description: "Put together a complete blog post in minutes.",
    inputs: [
      {
        type: "text",
        name: "title",
        title: "Title",
        placeholder: "Enter the title here",
        "max-length": 200,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 200,
        required: true,
      },
      {
        type: "text",
        name: "audience",
        title: "Audience",
        placeholder: "Define target audience",
        "max-length": 200,
        required: true,
      },
      {
        type: "text",
        name: "keywords",
        title: "Keywords",
        placeholder: "Enter the keywords here",
        "max-length": 200,
        required: true,
      },
    ],
  },
  {
    template_id: "faq-generator",
    title: "FAQ Generator",
    icon: FaqIcon,
    category:[ "Product Marketing", "SEO"],
    description: "Generate FAQs for any topic to boost SEO",
    inputs: [
      {
        type: "text",
        name: "title",
        title: "Title",
        placeholder: "Enter yout bio title here",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Provide a brief description or a summary of the content",
        "max-length": 3000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 200,
        required: true,
      },
    ],
  },
  {
    template_id: "personal-bio-generator",
    title: "Personal Bio Generator",
    icon: BioIcon,
    category:[ "Content Writing"],
    description: "Highlight your prowess with a compelling personal bio.",
    inputs: [
      {
        type: "textarea",
        name: "info",
        title: "Info",
        placeholder: "Describe yourself in simple words",
        "max-length": 600,
        required: true,
      },
      {
        type: "textarea",
        name: "achievements",
        title: "Achievements",
        placeholder: "E.g. your academic qualifications or certifications or awards",
        "max-length": 1000,
        required: true,
      },
      {
        type: "text",
        name: "interests",
        title: "Interests",
        placeholder: "List your interests here",
        "max-length": 200,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 200,
        required: true,
      },
      {
        type: "text",
        name: "point_of_view",
        title: "Point Of View",
        placeholder: "E.g. First person or third person",
        "max-length": 200,
        required: true,
      },
    ],
  },
  {
    template_id: "creative-story-writer",
    title: "Story Writer",
    icon: StoryIcon,
    category:[ "Content Writing"],
    description: "Turn your creative plot into a captivating story.",
    inputs: [
      {
        type: "textarea",
        name: "plot",
        title: "Plot",
        placeholder: "Enter the plot of the story here",
        "max-length": 2000,
        required: true,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter the tone here",
        "max-length": 200,
        required: true,
      },
    ],
  },
  {
    template_id: "blog-post-meta-description",
    title: "Blog Meta Description",
    icon: MetaDescIcon,
    category:[ "Content Writing", "Digital Marketing", "SEO"],
    description:
      "Attract more visitors with SEO-friendly title and description.",
    inputs: [
      {
        type: "text",
        name: "title",
        title: "Title",
        placeholder: "Enter the title here",
        "max-length": 200,
        required: true,
      },
      {
        type: "textarea",
        name: "descp",
        title: "Description",
        placeholder: "Enter the description here",
        "max-length": 500,
        required: true,
      },
      {
        type: "text",
        name: "kw",
        title: "Keywords",
        placeholder: "Define your keywords here. Separate them with comma.",
        "max-length": 2000,
        required: false,
      },
      {
        type: "text",
        name: "tone",
        title: "Tone",
        placeholder: "Enter tone",
        "max-length": 250,
        required: false,
      },
    ],
  },
];
