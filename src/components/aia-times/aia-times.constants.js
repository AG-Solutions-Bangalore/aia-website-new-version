import { BASE_URL } from "@/api/base-url";

export const ASSET_BASE = `${BASE_URL}/assets/images/web_images`;
export const LOCAL_AIA_TIMES_ASSET_BASE = "/images/AIATimes";
export const SERVER_NO_IMAGE = `${BASE_URL}/assets/images/no_image.jpg`;
export const MAGAZINE_COURSE = "AIA Times Magazine";

const rt = (...segments) => segments;
const b = (text) => ({ text, bold: true });
const bi = (text) => ({ text, bold: true, italic: true });

export const whatsNewItems = [
    {
    title: "CISA Preparation Course",
    description:
      "AIA Sets a New Benchmark with the Launch of Its CISA® Prep Course.",
    image: "aia_times_news.webp",
  },
  {
    title: "Becker Authorized Distributor",
    description:
      "AIA is now India's authorized Becker distributor for CIA preparation.",
    image: "time_becker.webp",
  },
  {
    title: "Partnership with ISACA",
    description:
      "AIA announces its strategic partnership with ISACA for professional learning initiatives.",
    image: "time_isaca.webp",
  },
  {
    title: "CIA Short Notes Launched",
    description:
      "Exclusive CIA short study notes launched by AIA for smart and strategic CIA prep.",
    image: "time_cia_short_notes.webp",
  },


  // {
  //   title: "CFE 4-Day Residential Program",
  //   description:
  //     "Admissions open for AIA's exclusive 4-day CFE residential training program.",
  //   image: "time_cfe_resident_al_program.webp",
  // },
];

export const issueSections = [
  {
    label: "01",
    title: "Cover Story",
    heading: "Decoding the Mindset Behind Every Financial Crime",
    subheading: "",
    description:
      "The biggest risk in financial crime isn\u2019t what is hidden. It\u2019s what looks normal. Most financial crimes don\u2019t break the system. They quietly work within it. And that\u2019s exactly why they\u2019re getting harder to catch. Fraudsters today are strategic. They understand how systems work, and more importantly, how people expect those systems to behave. Instead of forcing their way through controls, they design transactions that fit perfectly within them. The result? Fraud that doesn\u2019t look like fraud.",
    descriptionContent: rt(
      b(
        "The biggest risk in financial crime isn\u2019t what is hidden. It\u2019s what looks normal. ",
      ),
      "Most financial crimes don\u2019t break the system. They quietly work within it. And that\u2019s exactly why they\u2019re getting harder to catch.  ",
      b("Fraudsters today are strategic"),
      ". They understand how systems work, and more importantly, how people expect those systems to behave. Instead of forcing their way through controls, they design transactions that fit perfectly within them. The result? Fraud that doesn\u2019t look like fraud.",
    ),
    image: "cover_story.webp",
    imageWidth: "470px",
    icon: "Icon1.webp",
    bodyLabel: "",
    fullContent: [
      rt(
        b(
          "The biggest risk in financial crime isn\u2019t what is hidden. It\u2019s what looks normal. ",
        ),
        "Most financial crimes don\u2019t break the system. They quietly work within it. And that\u2019s exactly why they\u2019re getting harder to catch.",
      ),
      rt(
        b("Fraudsters today are strategic."),
        " They understand how systems work, and more importantly, how people expect those systems to behave. Instead of forcing their way through controls, they design transactions that fit perfectly within them. The result? Fraud that doesn\u2019t look like fraud.",
      ),
      rt(
        b("According to ACFE\u2019s Report, May 2026"),
        ", organisations lose approx 5% of their annual revenue to fraud, across 2,402 cases studied globally, with a median loss of $104,000 per case & total documented losses exceeding $3.4 billion. The threat is not coming from outside the building. It lives inside processes, access rights, and inside the trusted organisations extend without question.",
      ),
      "Procurement fraud alone now ranks among the top three most disruptive economic crimes globally, sitting just behind cybercrime and corruption.",
      {
        type: "disclaimer",
        text: rt(bi("Source: Silenteight")),
      },
      {
        type: "insight",
        text: rt(
          bi("Insight for block"),
          " 71% expect financial crime to rise in 2025. Yet only 1 in 4 organisations feel their compliance programme is truly effective - ",
          bi("Kroll Financial Crime Report 2025"),
        ),
      },
      rt(
        b("In 2026"),
        ", this is not the era of simple scams or easily flagged transactions. Today\u2019s financial crime is built on smaller, repeated movements, multiple entities instead of single accounts, patterns that mimic legitimate business activity. ",
        b("Everything looks clean,"),
        " and that\u2019s exactly the problem.",
      ),
      "Because the challenge is no longer about spotting what is wrong. It\u2019s about questioning what appears completely right.",
      {
        type: "heading",
        text: "Hidden Layers of Frauds",
      },
      rt(
        "If financial crime earlier was about hiding money, today it is about making it look like it was never hidden in the first place. This is what ",
        b("\u201chidden layers\u201d"),
        " actually mean.",
      ),
      rt(
        b("They are carefully structured"),
        " movements of money embedded within legitimate-looking activity, designed to avoid suspicion at every stage. The objective is no longer to disappear - but to blend in. Instead of direct transfers, funds are broken into smaller amounts, routed through multiple accounts or entities, and spread across transactions that individually raise no concern. The complexity only becomes visible when these movements are viewed together. And that\u2019s where the gap lies.",
      ),
      rt(
        b("In many corporate environments"),
        ", these layers are not external but embedded within internal processes. Most reviews happen at a transaction level. Rarely at a pattern level. As long as each step looks acceptable, the larger structure often goes unquestioned. That\u2019s exactly what modern fraud depends on.",
      ),
      {
        type: "heading",
        text: "Mindset Behind Fraud",
      },
      rt(
        b("Fraudsters start"),
        " with understanding the system. What gets questioned, and more importantly, what doesn\u2019t. Their objective is to work within it - predictably and quietly.",
      ),
      rt(
        "This is why most modern fraud schemes are not aggressive. They are patient. Instead of large, attention-grabbing movements, they rely on smaller, repeated actions that gradually build into something significant. ",
        b("A key part of this thinking is anticipation."),
      ),
      "Fraudsters observe how auditors or systems behave. They understand what documentation is typically accepted. In many cases, they even replicate legitimate business patterns to avoid standing out. Money, in such cases, is not simply hidden. It is repositioned - through vendors, layered entities, or multiple accounts - until tracing its origin becomes difficult without deeper analysis.",
      {
        type: "heading",
        text: "Why Detection is Getting Harder",
      },
      rt(
        b("Good investigators don't wait for a smoke. They look for a smoking gun."),
        " ",
        b("In practice, decoding"),
        " financial crime is more about reading a story told across hundreds of them. Experienced investigators are trained to spot what doesn't fit - accounts that receive funds in round numbers, businesses that report consistent revenue regardless of economic conditions, customers whose transaction behaviour shifts sharply without any obvious life event. Network analysis is equally powerful. ",
        b("Mapping relationships between accounts, "),
        "entities, and transactions often reveals the architecture of a scheme that no single data point could expose.",
      ),
      rt(
        "It's the difference between examining one piece of a puzzle and stepping back to see the full picture. ",
        b("But technology "),
        "only takes you so far. The most effective investigators bring something no algorithm can replicate - contextual judgement. Understanding why a particular business structure exists in a specific jurisdiction. Recognising when a compliance explanation is technically accurate but operationally implausible. Knowing which questions to ask when everything is on paper looks clean.",
      ),
      rt(bi("The best fraud examiners think like investigators building a case.")),
      {
        type: "heading",
        text: "Thinking Ahead of a Fraudster",
      },
      rt(
        "The most uncomfortable truth in financial crime prevention is - ",
        bi(
          "\u201cthe professionals who catch fraudsters most effectively are the ones who understand how they think.\u201d",
        ),
      ),
      rt(
        "This isn't about ",
        b("moral alignment"),
        " - it's about intellectual empathy. Knowing what a fraudster is trying to achieve, what risks they're willing to accept.",
      ),
      rt(
        "It's also why red team exercises, scenario-based training, and case study analysis are becoming standard practice in leading audit and compliance functions. ",
        b("Theoretical knowledge"),
        " of fraud typologies is useful. But walking through a real scheme - understanding the decision points, the cover stories, the exit strategies - builds a different kind of readiness.",
      ),
      rt(
        "The ",
        b("fraudster's greatest advantage"),
        " is that most organisations are designed to operate in good faith. Processes are built assuming honest intent. Controls are structured around known risks. Thinking like a fraudster means questioning those assumptions - not cynically, but deliberately.",
      ),
      rt(
        b("The professionals"),
        " who will matter most in this space are the ones who understand human behaviour, who can read patterns across noise, and who approach every process with the quiet question: where is the gap?",
      ),
      rt(
        b("Decoding financial crime"),
        " begins with a mindset. And that mindset, like any professional skill, can be built, trained, and sharpened.",
      ),
    ],
  },
  {
    label: "02",
    title: "Case Study",
    heading: "The Toshiba Fraud Story",
    subheading: "When Corporate Pressure Becomes Corporate Fraud",
    description:
      "For decades, Toshiba was regarded as a symbol of corporate reliability. Known for its engineering excellence and disciplined operations, the company enjoyed strong investor confidence and global credibility. That reputation suffered a major blow in 2015 when an independent investigation revealed that Toshiba had overstated its profits by nearly USD 1.2 billion over several years. What made the scandal particularly significant was not the complexity of the fraud, but the culture behind it. The Toshiba case remains one of the strongest examples of how organizational pressure and weak challenge culture can gradually distort financial reporting without obvious signs of traditional fraud. For auditors and compliance professionals, the case highlights a critical reality: financial manipulation often develops slowly through normalized compromises rather than deliberate large-scale deception from the outset.",
    descriptionContent: rt(
        b("For decades,"),
        " Toshiba was regarded as a symbol of corporate reliability. Known for its engineering excellence and disciplined operations, the company enjoyed strong investor confidence and global credibility. That reputation suffered a major blow in 2015 when an independent investigation revealed that Toshiba had overstated its profits by nearly ",
        bi("USD 1.2 billion"),
        " over several years. What made the scandal particularly significant was not the complexity of the fraud, but the culture behind it. The ",
        b("Toshiba case remains"),
        " one of the strongest examples of how organizational pressure and weak challenge culture can gradually distort financial reporting without obvious signs of traditional fraud. For auditors and compliance professionals,",
        b(" the case highlights"),
        " a critical reality: financial manipulation often develops slowly through normalized compromises rather than deliberate large-scale deception from the outset. ",
      ),
    image: "case_study.webp",
    imageWidth: "470px",
    icon: "Icon4.webp",
    bodyLabel: "Case Overview:",
    fullContent: [
      rt(
              b("For decades,"),
              " Toshiba was regarded as a symbol of corporate reliability. Known for its engineering excellence and disciplined operations, the company enjoyed strong investor confidence and global credibility. That reputation suffered a major blow in 2015 when an independent investigation revealed that Toshiba had overstated its profits by nearly ",
              bi("USD 1.2 billion"),
              " over several years. What made the scandal particularly significant was not the complexity of the fraud, but the culture behind it. The ",
              b("Toshiba case remains"),
              " one of the strongest examples of how organizational pressure and weak challenge culture can gradually distort financial reporting without obvious signs of traditional fraud. For auditors and compliance professionals,",
              b(" the case highlights"),
              " a critical reality: financial manipulation often develops slowly through normalized compromises rather than deliberate large-scale deception from the outset. ",
            ),
      {
              type: "heading",
              text: "Inside Toshiba\u2019s Accounting Crisis",
            },
      rt(
              "The fraud at Toshiba primarily involved the overstatement of profits across multiple business divisions over several years. ",
              b("Senior leadership reportedly "),
              "imposed unrealistic profit expectations on operational teams, creating intense pressure to meet financial targets regardless of market conditions. Within that environment, division heads and finance teams began making accounting adjustments designed to close performance gaps. One major technique involved delayed loss recognition. Underperforming projects were prevented from recording losses immediately, allowing divisions to maintain stronger short-term profitability. ",
              b("Another method involved"),
              " inflated revenue recognition on long-term projects. Accounting estimates relating to project completion percentages were manipulated to accelerate revenue reporting and improve financial results. Because these practices relied heavily on management judgment and accounting estimates, the manipulation often appeared technically explainable in isolation. ",
              b("However"),
              ", ",
              b("across multiple reporting "),
              "periods and business units, these adjustments collectively created a materially distorted financial picture. The fraud was not driven by a single transaction or department. It became embedded across operational structures, making detection increasingly difficult over time. ",
            ),
      {
              type: "heading",
              text: "Control Failures",
            },
      rt(
              "The ",
              b("Toshiba scandal demonstrated "),
              "that fraud can persist even in organizations with formal governance structures and established internal controls. The primary failure was not the complete absence of systems, but the inability of those systems to operate independently from management pressure. ",
              b("A key weakness"),
              " involved the organization\u2019s challenge culture. Employees and managers reportedly understood the pressure associated with meeting financial expectations, but escalation and dissent were limited within the company\u2019s hierarchical environment. As a result, accounting judgments and aggressive reporting assumptions faced insufficient internal challenges. Another major failure involved oversight of judgment-based accounting areas. ",
              b("Since the fraud relied"),
              " largely on estimates, project assumptions, and timing adjustments rather than fictitious transactions, routine controls were less effective in identifying manipulation. Repeated financial adjustments across divisions also failed to trigger deeper scrutiny. In many cases, temporary reporting corrections became normalized over time rather than being treated as indicators of broader control weaknesses.",
              b(" The case highlights"),
              " an important audit principle: controls become ineffective when organizational culture discourages transparency and prioritizes outcomes over reporting integrity. ",
            ),
      {
              type: "heading",
              text: "Red Flags Missed",
            },
      rt(
              b("Several warning indicators "),
              "were visible before the fraud became public. Toshiba consistently achieved financial targets despite challenging business conditions and market volatility. Unusually stable performance across reporting periods should have triggered increased skepticism and deeper analytical review. Frequent accounting adjustments and project estimate revisions also appeared across multiple divisions. While individually explainable, the repeated nature of these adjustments suggested a broader pattern of earnings management risk. Another significant red flag was the organization\u2019s performance-driven culture. Excessive pressure from leadership, particularly in environments where missing targets is implicitly discouraged, significantly increases the risk of financial manipulation. Perhaps the most overlooked warning sign was the absence of internal challenge. ",
              b("Employees reportedly recognized the pressure "),
              "surrounding financial reporting expectations, yet concerns were not escalated effectively. In highly hierarchical organizations, cultural reluctance to question senior management can become a major control vulnerability. The Toshiba case demonstrated that silence itself can become a fraud enabler. ",
            ),
      {
              type: "heading",
              text: "Key Lessons for Auditors",
            },
      rt(
              "The ",
              b("Toshiba fraud offers important lessons for auditors, investigators, and AML professionals."),
              " First, fraud risk must be evaluated beyond technical controls. Even well-designed systems can fail when organizational culture discourages independent challenge and transparency. Second, pressure from leadership should be treated as a measurable fraud risk indicator. Unrealistic targets, excessive performance expectations, and consistent pressure to deliver results can gradually influence reporting behavior across divisions. Third, auditors should apply enhanced scrutiny to judgment-based accounting areas ",
              b("such as project estimates, revenue recognition timing, and loss provisioning."),
              " These areas provide opportunities for manipulation that may not appear through standard transactional testing. The case also reinforces the importance of behavioral and cultural assessment during audits. Patterns such as repeated last-minute adjustments, excessive consistency in results, or reluctance to escalate concerns often reveal deeper governance issues. Most importantly, the Toshiba scandal demonstrates that fraud rarely begins with large-scale deception. It often begins with small compromises made under pressure\u2014compromises that become normalized over time until manipulation becomes embedded within the organization itself. ",
            ),
      {
              type: "heading",
              text: "Closing Insight",
            },
      rt(
              b("Toshiba did not fail because it lacked controls."),
              " It failed because those controls operated inside a culture where performance gradually became more important than transparency. That is what makes the Toshiba case particularly relevant for modern audit and compliance functions. The fraud was not hidden behind complexity. It was hidden behind normalization. For auditors and investigators, the message is clear: When organizations become excessively outcome-driven, the risk is no longer limited to operational failure\u2014it extends directly to reporting integrity. Because in corporate fraud, the greatest risks are often not the actions people deliberately conceal, but the behaviors organizations slowly learn to accept. ",
            ),
      {
              type: "disclaimer",
              text: rt(
                bi("Disclaimer: This case study is presented solely for educational purposes to learn from governance failures, audit gaps, and financial risk lessons drawn from the incident."),
                " ",
              ),
            },
    ],
  },
  {
    label: "03",
    title: "Learning Topic",
    heading: "Benford\u2019s Law",
    subheading: "Numbers Don't Lie - But They Do Reveal",
    description:
      "In 1938, a physicist named Frank Benford noticed something deeply strange. Across thousands of naturally occurring datasets - river lengths, population figures, stock prices, financial records - the number 1 appeared as the leading digit almost 30% of the time. The number 2 appeared around 17%. By the time you reached 9, it showed up less than 5%. This wasn't a coincidence. It was a mathematical pattern that repeats across almost every naturally generated dataset in existence. In simple terms, a naturally grown dataset, digit 1 leads 30%, 2 leads 17%, and all the way down to digit 9, it appears 4.6% of the time. The pattern is logarithmic, consistent, and remarkably predictable across industries, geographies, and time periods.",
    descriptionContent: rt(
        "In 1938, a physicist named Frank Benford noticed something deeply strange. Across thousands of naturally occurring datasets - river lengths, population figures, stock prices, financial records - the number 1 appeared as the leading ",
        b("digit almost 30% of the time"),
        ". The number ",
        b("2 appeared around 17%."),
        " By the time you reached 9, it showed up less than 5%. This wasn't a coincidence. It was a mathematical pattern that repeats across almost every naturally generated dataset in existence. ",
        bi("In simple terms, a naturally grown dataset, digit 1 leads 30%, 2 leads 17%, and all the way down to digit 9, it appears 4.6% of the time. The pattern is logarithmic, consistent, and remarkably predictable across industries, geographies, and time periods."),
      ),
    image: "learning_topic.webp",
    imageWidth: "470px",
    icon: "Icon3.webp",
    bodyLabel: "You don't always need a confession. Sometimes, the numbers confess themselves. So What Is Benford's Law?",
    fullContent: [
      rt(
              "In 1938, a physicist named Frank Benford noticed something deeply strange. Across thousands of naturally occurring datasets - river lengths, population figures, stock prices, financial records - the number 1 appeared as the leading ",
              b("digit almost 30% of the time"),
              ". The number ",
              b("2 appeared around 17%."),
              " By the time you reached 9, it showed up less than 5%. This wasn't a coincidence. It was a mathematical pattern that repeats across almost every naturally generated dataset in existence.",
            ),
      rt(
              bi("In simple terms, a naturally grown dataset, digit 1 leads 30%, 2 leads 17%, and all the way down to digit 9, it appears 4.6% of the time. The pattern is logarithmic, consistent, and remarkably predictable across industries, geographies, and time periods."),
            ),
      {
              type: "heading",
              text: "Key Features and Characteristics of Benford's Law",
            },
      "Understanding what makes Benford's Law work, and what makes it not work, is what separates professionals who apply it correctly from those who draw wrong conclusions from it.",
      {
              type: "heading",
              text: "It Applies to Natural Numbers - Not Assigned Ones",
            },
      rt(
              "Benford's Law only works on numbers that grow or occur naturally, not numbers that are assigned, defined, or constrained by human decision. ",
              bi("What does this mean practically?"),
              " A naturally occurring number emerges from real-world activity without a fixed range. ",
              b("Revenue figures grow"),
              " organically over time. Transaction amounts vary based on actual business activity. Population counts reflect real demographic movement. These are ",
              b("natural numbers"),
              " - unpredictable, unbounded, and driven by real events. Assigned numbers, on the other hand, are defined by a rule or a system. Employee ID numbers, telephone numbers, zip codes, product serial numbers - these are created within a fixed structure. They don't follow Benford's Law because they were never meant to grow organically. ",
              b("Applying Benford's Law"),
              " to assigned numbers is one of the most common mistakes investigators make, and it leads to false red flags that waste investigation time. ",
            ),
      {
              type: "heading",
              text: "It Requires a Large Volume of Data",
            },
      rt(
              "Benford's Law is a statistical phenomenon, which means it needs sufficient data to be meaningful. As a general rule, a dataset ",
              b("needs at least 1,000 data points"),
              " for the pattern to emerge reliably. With smaller datasets, random variation can mimic deviation, and genuine deviation can look like normal variation. This is a critical professional insight. If an auditor runs a Benford's Law test on 80 transactions and finds an anomaly, that anomaly may mean very little statistically. ",
              b("But if the same test runs across 15,000"),
              " transactions and reveals a consistent deviation in a specific digit - that is a signal worth pursuing. Volume is necessary here. ",
            ),
      {
              type: "heading",
              text: "It Works on Multi-Digit Data",
            },
      rt(
              "Benford's Law applies specifically to the leading digit of multi-digit numbers - meaning numbers that have at least two or more digits. ",
              b("Single-digit numbers like 1, 5, or 8 carry no"),
              " meaningful leading digit information and fall outside the scope of this analysis. More importantly, the law becomes progressively more powerful as the range of numbers in the dataset widens. A dataset in which figures range ",
              b("from \u20b9500 to \u20b950,00,000"),
              " will yield a far more reliable Benford analysis than one in which all figures fall",
              b(" between \u20b99,000 and \u20b912,000. "),
              "The wider the natural spread, the more clearly the pattern, and any deviation from it, reveals itself. ",
            ),
      {
              type: "heading",
              text: "On Which Datasets Does Benford's Law work effectively?",
            },
      rt(
              "Benford's Law works on data that grows naturally, figures shaped by real activity rather than human-defined rules.",
              b(" In practice,"),
              " this means accounts payable records, vendor payments, revenue figures across time periods, general ledger journal entries, expense reimbursements, and declared income in tax filings all qualify as strong candidates. Stock prices and market data, naturally generated through trading activity, are historically one of the datasets Benford himself studied. On the other hand, datasets where Benford's Law does not apply ",
              b("include ATM withdrawal"),
              " amounts constrained to fixed denominations, prices set by policy such as standard government fees, and any dataset where a human decision, rather than natural activity, determines the range. ",
            ),
      {
              type: "heading",
              text: "In Which Type of Investigations Is It Used?",
            },
      rt(
              "Benford's Law is actively used ",
              b("across a wide range "),
              "of professional investigations, and its application is growing as more organisations build it into their standard analytical procedures. ",
              b("Forensic auditors use it"),
              " to screen vendor payment files and expense records for signs of manipulation. Tax authorities run it against declared income claims to detect fabricated figures. ",
              b("In AML investigations,"),
              " it helps identify structuring patterns where transaction amounts appear deliberately engineered. External auditors apply it during risk assessment to test the integrity of journal entries, while internal audit teams deploy it in corporate fraud investigations involving fictitious vendors or manipulated reporting. In fact, courts in the ",
              b("United States have accepted Benford analysis"),
              " as supporting evidence in fraud prosecutions, a measure of how seriously the professional world treats this tool. Knowing where a tool works is just as valuable as knowing how to use it, and in an investigation, it determines the quality of the conclusion. ",
            ),
      {
              type: "heading",
              text: "On Which Organization Data It Applies?",
            },
      rt(
              b("Benford's Law"),
              " delivers its strongest results in organisations where financial activity is high volume, naturally variable, and spans a wide numerical range. Large corporations with thousands of transactions across multiple business units, banks processing millions of customer entries, government procurement bodies, and mid-sized businesses with active vendor ecosystems are all prime candidates. The wider and more organic the data, the more clearly any deviation stands out. Where it loses reliability is in organisations with limited transaction history, narrowly priced product structures, or highly standardised payment amounts, environments where the natural variability Benford depends on simply doesn't exist. ",
              b("For compliance"),
              " teams deciding where to invest analytical effort, understanding this boundary is a sign of professional maturity. ",
            ),
      {
              type: "heading",
              text: "How Does This Expose Fraud?",
            },
      rt(
              "When someone fabricates financial data, they think intuitively. Fake invoices tend to cluster around round numbers - ",
              b("\u20b949,000, \u20b998,500, \u20b975,000. "),
              "Fictitious expenses get created just below approval thresholds - \u20b99,800 appearing suspiciously often. Made-up figures distribute themselves too evenly across leading digits because the fraudster's brain tries to appear random and ends up being anything but. When an auditor runs a Benford's Law analysis on a dataset and ",
              b("finds that the number 7 "),
              "is appearing as a leading digit",
              b(" 18% "),
              "of the time instead of the expected ",
              b("5.8% "),
              "- that's not normal variation. That's a red flag. That's the data telling you something is wrong before you've looked at a single invoice. ",
              b("A single spike in one digit"),
              " is notable. But a consistent pattern of deviation, where multiple digits show anomalous frequencies across the same dataset, is far more telling. It suggests systematic manipulation rather than isolated error. And systematic manipulation points to intent. ",
            ),
      {
              type: "heading",
              text: "Where Is It Actually Used?",
            },
      rt(
              b("Benford's Law isn't a theoretical curiosity."),
              " It is actively used by: Forensic auditors scan expense reports and vendor payment files for manipulation. Tax authorities, including the IRS, are screening filed returns for fabricated figures. Financial investigators analysing transaction records in fraud and AML cases. External auditors use an analytical procedure during risk assessment. ",
              b("In fact, courts in the United States "),
              "have accepted Benford's Law analysis as supporting evidence in financial fraud prosecutions. That is how seriously the professional world takes this tool. ",
            ),
      {
              type: "heading",
              text: "The One Thing to Remember",
            },
      rt(
              "Think of it as a smoke detector -",
              b(" not a fire."),
              " When the numbers deviate significantly from the expected distribution, it tells an investigator that something in this dataset deserves a much closer look. What they find when they look closer - that's where the real investigation begins.",
              b(" Used correctly"),
              ", it is one of the fastest ways to prioritise where investigative attention should go in a large dataset. Used incorrectly, on the wrong data, with too few records, or",
              b(" without understanding its limitations,"),
              " it produces noise rather than a signal. The professional who understands both its power and its boundaries is the one who uses it most effectively. For a student just entering audit or compliance, understanding ",
              b("Benford's Law"),
              " gives you something most early-career professionals don't have: a mathematical instinct for when numbers are lying. And in this field, that instinct is worth more than you think. ",
            ),
    ],
  },
  {
    label: "04",
    title: "Expert Talk",
    heading: "Truth behind the transactions:",
    subheading: "Insights from Inside the System",
    description:
      "CA and Partner at BDO India's Risk Advisory Services division, brings over 23 years of experience in risk consulting across audit, compliance, and financial controls. His expertise spans risk-based internal audits, SOX and IFC frameworks, and business process improvement - with deep specialisation in the BFSI and Fintech sectors. He has led complex engagements across India, US, UK, Dubai, and other European geographies, working with large multinational clients on KYC reviews, transaction monitoring, internal controls, and regulatory compliance. In this conversation, Tarun shares the insights that only come from two decades of working inside the system.",
    image: "expert_talk.webp",
    imageWidth: "470px",
    icon: "Icon2.webp",
    bodyLabel: "Tarun Kher,",
    fullContent: [
      "CA and Partner at BDO India's Risk Advisory Services division, brings over 23 years of experience in risk consulting across audit, compliance, and financial controls. His expertise spans risk-based internal audits, SOX and IFC frameworks, and business process improvement - with deep specialisation in the BFSI and Fintech sectors. He has led complex engagements across India, US, UK, Dubai, and other European geographies, working with large multinational clients on KYC reviews, transaction monitoring, internal controls, and regulatory compliance. In this conversation, Tarun shares the insights that only come from two decades of working inside the system.",
      {
        type: "question",
        text: "1. As AI reshapes financial systems, do you see it strengthening transparency or making financial crime harder to detect?",
      },
      "AI has given investigators incredible power to spot patterns across millions of transactions. But the same technology is helping criminals move faster by adopting discreet techniques. What I worry about most, though, is alert fatigue; when the system flags so much that investigators stop looking beyond the obvious. Technology can process data; however it cannot replace the human intelligence required to read between the lines, sense something is off, and ask the uncomfortable questions. While AI is a powerful tool, professional discernment remains the strongest differentiator.",
      {
        type: "question",
        text: "2. What are the most dangerous blind spots organizations ignore when it comes to fraud?",
      },
      "The biggest blind spot, I believe, is trusting the system too much. Organisations invest in technology and then assume it is catching everything. No system is smarter than the person who built it or the fraudster who has been studying it. The second one is missing apparent dots. Something looks slightly off, it gets noted, and then life moves on. But those small dots are often the beginning of something much bigger. Another major blind spot is unquestioned trust, particularly in long-standing employees, familiar vendors, and relationships perceived as low risk. The most damaging frauds I have seen came from exactly those trusted relationships. Familiarity breeds complacency.",
      {
        type: "question",
        text: "3. From your perspective, where do financial irregularities usually begin: process gaps, people, or pressure?",
      },
      "In my experience, it's almost never just one. Absence of a robust internal control framework creates the opportunity for opening the glass door. People either exploit it deliberately or stumble through it by mistake, often starting with a small rationalisation: \"Just this once.\" But the real accelerant is pressure. Targets to hit, relationships to protect, jobs on the line. I have seen otherwise good people make bad decisions because the environment made it feel necessary. The most dangerous frauds I have encountered were often not driven by habitual offenders. They were driven by ordinary people, under extraordinary pressure, inside systems that asked too few questions.",
      {
        type: "question",
        text: "4. What kind of mindset allows someone to see what others miss in an audit while looking for fraud red flags?",
      },
      "You have to be willing to question what everyone else has already accepted. Most people in an organisation stop noticing the cracks, because they become part of the wallpaper. A good auditor walks in fresh and asks, \"Why does this work this way?\" Fraud rarely announces itself loudly. It lives in the edges, a small journal entry that repeats quietly, a vendor that looks right but does not feel right. The skill is connecting those small anomalies. Horizontal and vertical pattern analysis might narrate a story. Train yourself to build that story before dismissing any single piece.",
      {
        type: "question",
        text: "5. Have you ever faced a situation where financial integrity conflicted with business pressure? How do leaders navigate that?",
      },
      "Yes, more than once. And I will be honest; it is never comfortable. The pressure does not always come aggressively. Sometimes it is a quiet suggestion, a raised eyebrow, someone senior saying \"Let's be pragmatic here.\" That is where your backbone matters. The leaders I have truly respected are the ones who think long-term. They know that short-term compromises rarely lead to long-term professional rewards. Regulators remember. Reputation takes years to build and minutes to damage. Culture is shaped by what leadership tolerates, not what it says in a policy document. That is what real leadership looks like under pressure.",
      {
        type: "question",
        text: "6. What mindset should someone develop if they want to become a top investigator or fraud examiner or an auditor?",
      },
      "Be genuinely curious, not just professionally, but personally as well. The best investigators I have worked with ask questions. They do not take the first answer they are given. They sit with discomfort when things don't add up, rather than explaining it away. They notice the small things, details that feel slightly off even if they cannot immediately say why. Investigations rarely resolve cleanly or quickly; patience and perseverance must prevail. If you are someone who needs neat answers fast, this work will frustrate you. Embrace ambiguity - that is often where the truth hides.",
      {
        type: "question",
        text: "7. Having decades of audit and compliance experience across the industries, any special message you would like to pass onto the young auditors to grow in their professional career?",
      },
      "Your qualification is the starting point, not the finishing line. Keep learning, not just the technical standards, but the world around you. Understand how businesses really work, how people behave under stress. Think beyond the textbook; fraud does not follow templates and real situations are far messier than case studies. Most importantly, build your judgment. Protect your reputation. It is your most valuable asset. Always do the right thing every time, even if no one is watching.",
    ],
  },
];

export const vol02IssueSections = [
  {
    label: "01",
    title: "Cover Story",
    heading: "Individual Numbers Can Deceive, But Patterns Reveal the Truth",
    subheading: "",
    description:
      "In early 2024, a finance employee at Arup, one of the world's largest engineering firms, joined a video conference call with his CFO and several senior colleagues. They discussed a confidential transaction. They looked real. They sounded real. They were not. Every person on that call was an AI-generated deepfake. By the time the fraud was discovered, the employee had wired $25 million to accounts controlled by fraudsters.",
    descriptionContent: rt(
      b("In early 2024,"),
      " a finance employee at Arup, one of the world's largest engineering firms, joined a video conference call with his CFO and several senior colleagues. They discussed a confidential transaction. They looked real. They sounded real. They were not. Every person on that call was an AI-generated deepfake. By the time the fraud was discovered, the employee had wired $25 million to accounts controlled by fraudsters.",
    ),
    image: "vol 2_cover_story.webp",
    imageWidth: "470px",
    icon: "Icon1.webp",
    bodyLabel: "",
    fullContent: [
      "In early 2024, a finance employee at Arup, one of the world's largest engineering firms, joined a video conference call with his CFO and several senior colleagues. They discussed a confidential transaction. They looked real. They sounded real. They were not. Every person on that call was an AI-generated deepfake. By the time the fraud was discovered, the employee had wired $25 million to accounts controlled by fraudsters.",
      "No forged document. No hacked system. No inside accomplice. Just a pattern of behaviour, an unusual request, an unsolicited meeting, a sense of urgency, that an auditor trained to question the ordinary might have caught before the transfer was ever made. This is what fraud looks like in 2025. Not dramatic. Not always obvious. But always, always - built on a pattern.",
      {
        type: "heading",
        text: "When the Numbers Grew Louder",
      },
      "The numbers are no longer quiet. In India, the Reserve Bank of India's most recent data shows bank frauds reached ₹48,021 crore in FY2025–26 - a 46.4% increase from the previous year and more than four times the ₹11,013 crore reported just two years earlier. The case count has fallen, but the average value per fraud has surged. Fewer frauds, far larger losses. The sophistication is rising faster than the frequency.",
      {
        type: "insight",
        text: rt(
          b("₹48,021 Cr. "),
          "Bank fraud value reported in India - FY2025–26  |  RBI Annual Report 2026",
        ),
      },
      "Globally, losses to occupational fraud are estimated at USD 5 trillion every year. A typical fraud case runs for twelve months before detection, and the longer it continues, the higher the resultant loss. What these numbers share is not a story about clever criminals. It is a story about patterns that were present, and unread.",
      {
        type: "heading",
        text: "What Hides Between the Lines",
      },
      "Fraud rarely announces itself through a single, catastrophic transaction. The version that makes headlines - the overnight collapse, the missing crores, the sudden arrest - is the final chapter of a story that began months or years earlier in the quietest possible way. A vendor added to the master data without verification. An approval processed by the same person who raised the request. An invoice amount that lands, month after month, just below the threshold that would require a second signature.",
      "Each of these events, reviewed in isolation, passes. It is only when they are read together, as a sequence, a pattern, a shape forming across time - that the fraud becomes visible.",
      "More than half of all occupational frauds globally occur due to a lack of internal controls or an override of existing controls. The override is not the fraud - it is the pattern that enables it. And it is the pattern that conventional, point-in-time auditing is least equipped to catch.",
      "The fraudster is not acting randomly. They are acting systematically. Which means the evidence of their system is always there - in the timing, the amounts, the approvals, the relationships.",
      {
        type: "heading",
        text: "The Architect Behind the Pattern",
      },
      "Understanding how fraud is designed is the fastest route to understanding how to detect it. Experienced fraud examiners consistently observe that perpetrators think in systems, not transactions. They learn approval thresholds and stay beneath them. They identify the moments of lowest scrutiny - year-end, leadership transitions, the week before a scheduled audit - and concentrate their activity there. They build relationships that provide cover and create processes they control end-to-end.",
      "According to ACFE data, excessive pressure from within the organisation is associated with a median fraud loss of $532,000, the highest of any behavioural red flag category. Pressure does not create fraud on its own. But it creates the rationalisation that allows someone to begin. And once begun, fraud follows patterns as predictable as the controls it exploits.",
      "What this means for investigators is precise: the fraudster has already left a map. Every threshold avoided, every approval timed, every relationship cultivated to reduce scrutiny. They are decisions. And decisions, made consistently over time, form patterns that no amount of concealment can fully erase. The auditor's job is to read the map before the journey completes.",
      {
        type: "heading",
        text: "The Pattern Is Changing. Are You?",
      },
      "The same technology giving investigators more data is giving fraudsters more weapons. AI-related fraud cases rose from 23% in 2024 to 35% of all cases in early 2025, according to Experian's UK Fraud and Financial Crime Report. Generative AI-enabled fraud losses are projected to reach $40 billion in the United States alone by 2027. In the first half of 2025, deepfake-related fraud losses exceeded $410 million globally, and advanced attacks involving deepfakes, AI-generated identities, and multilayered social engineering increased 180% year-over-year.",
      {
        type: "insight",
        text: rt(
          b("180% "),
          "Year-over-year increase in advanced fraud attacks involving deepfakes and AI-generated identities  |  Sumsub Identity Fraud Report 2025–26",
        ),
      },
      "In India, fraud cases reported to the RBI nearly tripled between 2023 and 2024 among digital banking institutions. Nearly 90% of all cases reported pertained to previous fiscal years - meaning the true present-day scale remains obscured by significant reporting delays. The fraud is moving faster. The patterns are being deliberately obscured. Detection cannot afford to stay at the same pace.",
      {
        type: "heading",
        text: "Reading What the Data Won't Say Directly",
      },
      "The shift from conventional auditing to pattern-based investigation is not about adopting new software. It is about changing the question. A conventional audit asks: Is this transaction correct? A pattern-based investigation asks: what does this transaction look like in relation to every other transaction around it? That shift, from vertical review to horizontal analysis, is where hidden fraud becomes visible.",
      "In practice, this means cross-referencing vendor master data against employee records to expose undisclosed relationships. It means applying journal entry testing to find manual overrides processed at unusual hours by unusual users. It means mapping approval chains to identify individuals who appear too consistently in too many high-value decisions. It means treating timing, frequency, and proximity not as background detail but as primary evidence.",
      "Despite the growing complexity of fraud schemes, the median training budget per fraud investigator has remained stagnant at $2,000 since 2019. The tools are improving. The investment in the human capability to use them has not kept pace, and that gap is where patterns go unread.",
      {
        type: "insight",
        text: rt(
          bi(
            '"Fraud survives where curiosity stops. The pattern was always there. It simply required someone willing to read it."',
          ),
        ),
      },
      {
        type: "heading",
        text: "See It Before It Surfaces",
      },
      "The most effective audit mindset is not one that assumes compliance. It assumes the opposite, and then works to prove itself wrong. This is not cynicism. It is professional rigour. It means reviewing a vendor relationship not just for whether invoices match, but for whether the relationship itself makes sense. It means treating a clean audit not as a conclusion, but as a reason to ask one more question.",
      "Surprise audits reduce fraud losses by up to 63% compared to organisations that do not use them. External audits reduce losses by 52%. The mechanism behind both is the same: they introduce unpredictability into an environment that fraud depends on being predictable. They disrupt the pattern the fraudster has built their scheme around.",
      "The professionals who will define the next decade of forensic audit are not simply the ones with the most technical knowledge. They are the ones who have trained themselves to be genuinely uncomfortable with easy answers, who follow a thread even when every individual piece of it looks perfectly normal, who understand that the space between data points is not empty. It is where the pattern lives.",
      {
        type: "insight",
        text: rt(
          bi(
            '"Individual numbers can deceive. But patterns - read carefully, followed patiently - always reveal the truth."',
          ),
        ),
      },
    ],
  },
  {
    label: "02",
    title: "Case Study",
    heading: "The Boss Scam",
    subheading: "How a Fake Identity Drained Corporate Accounts",
    description:
      "When Authority Became the Weapon, and Trust Became the Vulnerability. In three Delhi-based companies, within a span of fourteen days, finance employees received urgent messages from what appeared to be their respective CEOs. The instructions were clear, confidential, and time-sensitive. The employees complied. A total of over ₹7 crore left corporate accounts before anyone realised the CEOs had never sent those messages.",
    descriptionContent: rt(
      b("When Authority Became the Weapon,"),
      " and Trust Became the Vulnerability. In three Delhi-based companies, within a span of fourteen days, finance employees received urgent messages from what appeared to be their respective CEOs. The instructions were clear, confidential, and time-sensitive. The employees complied. A total of over ₹7 crore left corporate accounts before anyone realised the CEOs had never sent those messages.",
    ),
    image: "vol2_case_study.webp",
    fallbackImage: "case_study.webp",
    imageWidth: "470px",
    icon: "Icon4.webp",
    bodyLabel: "Case Overview:",
    fullContent: [
      rt(
        b("When Authority Became the Weapon,"),
        " and Trust Became the Vulnerability. In three Delhi-based companies, within a span of fourteen days, finance employees received urgent messages from what appeared to be their respective CEOs. The instructions were clear, confidential, and time-sensitive. The employees complied. A total of over ₹7 crore left corporate accounts before anyone realised the CEOs had never sent those messages.",
      ),
      "No system was hacked. No password was stolen. The only thing exploited was the most powerful force inside any organisation - the unquestioned authority of a senior leader. Cybercriminals invested significant time researching their targets - studying organisational hierarchies, communication styles, and internal financial workflows before executing the scam. The fraud walked through the front door wearing a familiar face.",
      {
        type: "insight",
        text: rt(
          b("Business Email Compromise (BEC) - "),
          "A cyber-enabled fraud where criminals impersonate senior executives through fake business emails or messages to trick employees into authorising unauthorised financial transfers.",
        ),
      },
      {
        type: "heading",
        text: "STAGE 1 - Reconnaissance: Learning the Organisation From the Outside",
      },
      "Before a single fraudulent message was sent, the attackers did their homework. Attackers leveraged lookalike domains, fake executive profiles, and AI-generated communications - using publicly available information from company websites, LinkedIn profiles, press releases, and social media to map internal hierarchies, identify finance decision-makers, and study the communication tone of senior executives.",
      "They knew who reported to whom. They knew which employees had payment authority. They understood the internal language well enough to replicate it convincingly. By the time the first fraudulent message was sent, the attacker already knew exactly which person to target, which amount would not raise immediate suspicion, and which framing - urgency, confidentiality, authority - would be most effective.",
      rt(
        b("What this stage reveals: "),
        "The fraud begins with a pattern of information gathering that left no financial trace and triggered no internal alert.",
      ),
      {
        type: "heading",
        text: "STAGE 2 - Entry: The Regulatory Disguise",
      },
      "The latest variant of the Boss Scam began with cybercriminals impersonating regulators, specifically the Reserve Bank of India, sending urgent messages to CEOs or senior executives via email, SMS or WhatsApp. These messages contained malicious archives disguised as urgent regulatory compliance documents or software updates.",
      "When the senior executive - the intended impersonation target - opened the attachment, malware was delivered to their device. This gave attackers access to the executive's WhatsApp account, communication patterns, and in some cases, their contact list. The executive's own account was now the weapon.",
      rt(
        b("What this stage reveals: "),
        "The fraud exploited a trust gap at the very top of the organisation. The CEO became a victim before the finance team became a target.",
      ),
      {
        type: "heading",
        text: "STAGE 3 - Execution: The Urgent Instruction",
      },
      "With access to, or a convincing replica of, the executive's communication channel, the attacker contacted the finance team directly. The scammer used a spoofed email address or compromised WhatsApp profile to send urgent-sounding messages to employees, portraying instructions as coming directly from the CEO or senior boss - instructing the employee to quickly transfer funds for an urgent, confidential business deal.",
      "The instruction carried every marker of legitimacy - correct name, familiar tone, plausible business context. It also carried the one element most effective at bypassing verification: urgency. The request needed to be actioned immediately. It was confidential. It could not go through normal channels. Standard procedures would delay something important. The employee complied. The transfer was processed.",
      rt(
        b("What this stage reveals: "),
        "Urgency and authority, combined, are the most effective fraud delivery mechanism ever identified. Neither requires technical sophistication to deploy.",
      ),
      {
        type: "heading",
        text: "STAGE 4 - Concealment: Staying Inside the Noise",
      },
      "The final stage of the Boss Scam was not dramatic. It was designed to be invisible. Transfer amounts were calibrated to fall within ranges that would not immediately trigger internal review thresholds. Instructions came through channels - WhatsApp, email- that were already part of normal workplace communication. The request referenced real business contexts - regulatory requirements, confidential acquisitions, vendor urgencies - that were plausible enough not to invite scrutiny.",
      "By the time the fraud was discovered, the funds had moved through multiple accounts. In most documented cases, discovery occurred not through internal audit or monitoring - but when the real executive was contacted about a transaction they had never authorised.",
      rt(
        b("What this stage reveals: "),
        "The fraud was designed to look like business as usual, and it succeeded because, in most organisations, business as usual lacks the verification layer that would have stopped it.",
      ),
      {
        type: "heading",
        text: "WHERE CONTROLS FAILED",
      },
      "The Boss Scam succeeded not because organisations lacked systems - but because the systems they had were never designed to question authority. No dual authorisation existed for high-value transfers initiated through digital channels. No callback protocol required finance teams to independently verify payment instructions with the requesting executive. The same employee who received the instruction processed the transfer - with no independent checkpoint between the two actions. At the senior level, executive devices lacked adequate malware protection, allowing attackers to compromise the very accounts the finance team trusted most. Most critically, no policy distinguished between a WhatsApp message and a formally authorised payment instruction. The controls existed on paper. The culture to enforce them did not.",
      {
        type: "heading",
        text: "RED FLAGS MISSED",
      },
      "Every stage of the Boss Scam carried signals that, in hindsight, were impossible to ignore, and in real time, were ignored completely. The instruction arrived through WhatsApp, not through any formal authorisation channel. It was marked urgent and confidential - the two words most consistently present in social engineering attacks. No supporting documentation accompanied the request. The payee account details were new and unverified. The message arrived outside normal business hours. And to those who noticed it, the executive's tone felt slightly different - briefer, more transactional than usual. Each signal alone could be explained away. Together, they formed a pattern that a trained investigator or a finance team with a verification-first culture would have recognised before the transfer was ever processed.",
      {
        type: "heading",
        text: "LESSONS FOR AUDITORS",
      },
      rt(
        b("1. The Absence of a Paper Trail Is Itself a Red Flag\n"),
        "In every documented Boss Scam case, the fraudulent payment instruction arrived without supporting documentation - no purchase order, no contract reference, no formal approval record. A payment that cannot be traced to a documented business need should not be processed, regardless of who appears to have authorised it. Auditors reviewing payment processes should specifically test for transactions where the authorisation chain begins and ends with a single digital message.",
      ),
      rt(
        b("2. Urgency Is a Control Override, Not a Business Requirement\n"),
        "The consistent presence of urgency across all Boss Scam cases is the mechanism by which normal verification is suspended. Internal audit should examine whether the organisation's payment approval process has a documented exception for urgent requests, and if so, whether that exception itself has adequate controls. Urgency should trigger more verification, not less.",
      ),
      rt(
        b("3. Informal Communication Channels Are an Audit Blind Spot\n"),
        "As organisations increasingly use messaging platforms for workplace communication and quick approvals, WhatsApp-based corporate fraud has emerged as a recurring pattern, particularly targeting finance teams and decision-makers. Auditors should assess whether payment authorisation policies explicitly address instructions received through informal channels, and whether finance teams have clarity on which channels carry authorisation authority and which do not.",
      ),
      rt(
        b("4. The Entry Point Was the Executive, Not the Finance Team\n"),
        "The Boss Scam succeeded in part because the fraud entered the organisation at the top, through the executive's device, before targeting the finance team. This means traditional fraud prevention focused on front-line employees misses the actual point of vulnerability. Auditors should evaluate whether cybersecurity controls, device policies, and awareness programmes extend to senior leadership with the same rigour applied to operational staff.",
      ),
      rt(
        b("5. Pattern Recognition Must Extend Beyond Financial Data\n"),
        "None of the red flags in the Boss Scam were financial in origin. They were behavioural - unusual timing, informal channels, absent documentation, tone inconsistencies. A fraud detection function that only reviews financial transactions will not catch a fraud that is designed to look like an authorised transaction. The auditor's lens must extend to process behaviour, communication patterns, and verification culture - not just numbers.",
      ),
      {
        type: "heading",
        text: "WHAT THIS MEANS FOR YOUR ORGANISATION",
      },
      rt(b("5 Controls to Implement Before This Happens to You")),
      rt(
        b("1. Implement Dual Authorisation for Emergency Transfers\n"),
        "No single employee should have the authority to both receive a payment instruction and process the corresponding transfer. Two independent approvals, through two separate channels, should be the minimum standard.",
      ),
      rt(
        b("2. Establish a Mandatory Callback Protocol\n"),
        "Any payment instruction received via email or WhatsApp, regardless of the apparent sender, must be verbally confirmed with the executive through a pre-registered, independently verified phone number before processing.",
      ),
      rt(
        b("3. Create a \"Pause and Verify\" Culture\n"),
        "Urgency should be treated as a trigger for more scrutiny, not less. Finance teams need explicit policy backing, and leadership support to pause and verify before acting on any unusual instruction, regardless of apparent authority.",
      ),
      rt(
        b("4. Define Authorised Payment Channels in Writing\n"),
        "WhatsApp messages and informal emails should not carry payment authorisation authority. Organisations should formally document which channels constitute valid authorisation, and train finance teams to apply that distinction consistently.",
      ),
      rt(
        b("5. Extend Cybersecurity Awareness Across the Organization\n"),
        "Malicious attachments, fake regulatory communications, and compromised messaging accounts are not threats that only front-line employees face. Executive-level cyber hygiene - verified device management, attachment policies, account monitoring - is a direct fraud prevention control to extend cybersecurity awareness across the organization.",
      ),
      {
        type: "disclaimer",
        text: rt(
          bi(
            "Disclaimer: This case study is presented solely for educational purposes to identify governance failures, audit gaps, and financial risk lessons drawn from documented fraud patterns. All details are sourced from official advisories issued by I4C, the Ministry of Home Affairs, Government of India (June 2025), and verified law enforcement disclosures.",
          ),
        ),
      },
    ],
  },
  {
    label: "03",
    title: "Learning Topic",
    heading: "Behavioural Pattern and Transaction pattern",
    subheading: "",
    description:
      "Behavioural Pattern = When People Change, Numbers Follow. Behavioural patterns are the human signals that precede financial irregularities. Most auditors are trained to find fraud in spreadsheets. But experienced investigators will tell you something different - fraud almost always shows up in behaviour before it shows up in data. Transaction pattern = The Story That Numbers Tell When You Stop Reading Them One at a Time.",
    descriptionContent: rt(
      b("Behavioural Pattern = When People Change, Numbers Follow. "),
      "Behavioural patterns are the human signals that precede financial irregularities. Most auditors are trained to find fraud in spreadsheets. But experienced investigators will tell you something different - fraud almost always shows up in behaviour before it shows up in data. ",
      b("Transaction pattern = The Story That Numbers Tell When You Stop Reading Them One at a Time."),
    ),
    image: "vol 2_learning_topic.webp",
    fallbackImage: "learning_topic.webp",
    imageWidth: "470px",
    icon: "Icon3.webp",
    bodyLabel: "",
    fullContent: [
      {
        type: "heading",
        text: "Behavioural Pattern = When People Change, Numbers Follow",
      },
      "Behavioural patterns are the human signals that precede financial irregularities. They don't appear in ledgers. They don't trigger system alerts. They are noticed or missed by the people in the room. Most auditors are trained to find fraud in spreadsheets. But experienced investigators will tell you something different - fraud almost always shows up in behaviour before it shows up in data.",
      "One of the most consistently documented behavioural indicators across fraud investigations globally is lifestyle inconsistency, commonly referred to as living beyond one's means. When an employee's visible lifestyle, vehicles, property, travel, spending- does not align with their known compensation, it creates a signal that experienced investigators treat seriously. This is not about judgement. It is about the gap between what is visible and what is explainable. In a significant majority of occupational fraud cases reviewed by the ACFE, perpetrators displayed unexplained lifestyle changes before the fraud was ever formally detected. What makes behavioural signals genuinely dangerous is how ordinary they look. The fraud does not announce itself; it disguises itself as someone doing their job particularly well.",
      {
        type: "heading",
        text: "Financial Institutions",
      },
      "In banks, insurance companies, and investment firms, behavioural fraud patterns are closely tied to access and client relationships. The most common signal is account ownership behaviour - a relationship manager or operations executive who becomes intensely possessive of specific accounts, clients, or transactions. They resist team reviews, discourage colleague involvement, and ensure that communication with a particular client runs exclusively through them.",
      "The second pattern is process avoidance. Employees involved in fraud consistently find reasons to bypass verification steps; they process transactions during off-hours, approve requests when senior staff is unavailable, or exploit system access privileges that should have been restricted.",
      "A third signal unique to financial institutions is unusual client familiarity - staff who develop personal relationships with clients outside professional boundaries, particularly when those clients are involved in high-value or high-frequency transactions. This social proximity often becomes the cover under which fraud operates.",
      {
        type: "heading",
        text: "Manufacturing",
      },
      "In manufacturing environments, behavioural patterns are concentrated in procurement, warehousing, and vendor management. The dominant signal here is vendor protectiveness. A purchase executive who insists on managing all communication with a specific supplier is displaying a pattern that experienced auditors treat as an immediate red flag.",
      "The second pattern is physical access control. Warehouse staff or store managers who restrict colleague access to specific inventory areas, insist on being present during all stock counts, or consistently volunteer to handle returns and write-offs independently are exhibiting control behaviour that warrants attention.",
      "A third manufacturing-specific signal is resistance to three-way matching. When procurement staff pushes back against purchase order, goods receipt, and invoice reconciliation processes, the resistance itself is worth examining.",
      {
        type: "heading",
        text: "Service Organisations",
      },
      "In consulting firms, IT companies, and professional services, behavioural fraud patterns cluster around billing, subcontracting, and expense management.",
      "The clearest signal is timesheet and billing opacity. Employees or project managers who are vague about how hours are allocated or consistently bill to ambiguous project codes without clear justification are exhibiting patterns that forensic auditors follow closely.",
      "The second signal is subcontractor exclusivity. A project lead who repeatedly recommends the same external vendor or subcontractor, particularly one that cannot be independently verified, is displaying a pattern seen frequently in services fraud.",
      "A third signal is expense pattern rigidity. Employees who submit expense claims at consistent amounts, just within reimbursement limits, across multiple months without variation are not necessarily being careful; they may be structuring claims deliberately to avoid scrutiny.",
      "The auditor's job is to look past the surface, and ask what the pattern is actually saying.",
      {
        type: "heading",
        text: "Transaction pattern = The Story That Numbers Tell When You Stop Reading Them One at a Time",
      },
      "Fraud often hides in the ordinary. Three signals appear consistently across almost every transaction-based fraud investigation. Round-figure transactions, Amounts just below approval threshold limits, and limited payee concentration - a disproportionate volume of payments flowing to one or two vendors, approved by the same individual, with no competitive sourcing on record. Individually, each passes review. Together, they are the pattern.",
      "A single transaction proves very little. A sequence of them, their timing, their amounts, their relationships to each other, can prove almost everything. This is the core of transaction pattern analysis. It is about stepping back far enough to see what the data is drawing when you look at it as a whole.",
      "Fraudsters understand this instinctively. Which is why they don't commit fraud in one large, obvious transaction. They distribute it. They time it. They keep individual amounts within approval thresholds. They create enough distance between related entries that no single transaction triggers a flag. The pattern is visible - but only to someone who knows how to look for it.",
      {
        type: "heading",
        text: "Financial Institutions",
      },
      "In banking and financial services, transaction pattern analysis is both the most developed and the most complex.",
      "The most documented pattern is structuring - breaking large amounts into smaller transactions deliberately designed to stay beneath regulatory reporting thresholds. A series of cash deposits just above the threshold limit, which trigger reporting requirements, is not a coincidence. It is a pattern with intent behind it.",
      "The second pattern is round-trip transactions - funds that leave an account and return through a series of intermediary transfers, often across multiple accounts or entities, creating the appearance of legitimate business activity. Each transfer looks clean. The circuit only becomes visible when transactions are mapped across accounts and time.",
      "A third pattern is dormant account activation - sudden high-value activity in accounts that have shown little or no movement for extended periods. In fraud investigations, dormant accounts are frequently used as temporary holding points precisely because they attract less routine monitoring.",
      {
        type: "heading",
        text: "Manufacturing",
      },
      "In manufacturing, transaction fraud is most concentrated in procurement and inventory, and the patterns reflect the operational structure of the industry.",
      "The most common pattern is purchase order splitting. A single procurement requirement is divided into multiple smaller orders placed with the same vendor across short time periods - each order staying within individual approval limits while the combined value would have required senior sign-off.",
      "The second pattern is ghost supplier invoices - invoices submitted by vendors that exist on paper but have never delivered goods. These transactions appear in clusters, often at month-end or quarter-end, and frequently involve round-number amounts that do not reflect actual material costs.",
      "A third manufacturing-specific pattern is goods receipt manipulation - transactions where delivery quantities recorded in the system do not match physical stock levels, with the discrepancy consistently moving in the same direction over time.",
      {
        type: "heading",
        text: "Service Organisations",
      },
      "In service organisations, transaction fraud most commonly appears in billing, expenses, and subcontractor payments, areas where the link between payment and physical deliverable is hardest to verify.",
      "The clearest pattern is duplicate billing - the same deliverable invoiced twice under different project codes, billing periods, or slightly varied descriptions. In high-volume project environments, these duplicates can remain undetected for months when invoices are reviewed individually rather than compared across the full billing history.",
      "The second pattern is expense claim clustering - multiple employees submitting claims of identical or near-identical amounts across the same time period, particularly when those amounts sit just within reimbursement policy limits.",
      "A third pattern is subcontractor payment irregularity - payments to external vendors that do not align with contract milestones, deliverable timelines, or agreed rates. Subcontractor relationships are frequently used to route funds to connected parties, with each payment structured to appear within normal project expenditure.",
    ],
  },
  {
    label: "04",
    title: "Expert Talk",
    heading: "Data is Everywhere. Pattern Thinking is Rare.",
    subheading: "",
    description:
      "Pradip Bhale, CFE, is a Law Enforcement Officer with over two decades of experience in investigations and financial crime. He served as Dy SP in Mumbai, Maharashtra. He brings a rare combination of ground-level investigative instinct and certified forensic audit expertise to every case he encounters.",
    descriptionContent: rt(
      b("Pradip Bhale, CFE,"),
      " is a Law Enforcement Officer with over two decades of experience in investigations and financial crime. He served as Dy SP in Mumbai, Maharashtra. He brings a rare combination of ground-level investigative instinct and certified forensic audit expertise to every case he encounters.",
    ),
    image: "vol 2_expert_talk.webp",
    fallbackImage: "expert_talk.webp",
    imageWidth: "470px",
    icon: "Icon2.webp",
    bodyLabel: "Pradip Bhale, CFE,",
    fullContent: [
      "Pradip Bhale, CFE, is a Law Enforcement Officer with over two decades of experience in investigations and financial crime. He served as Dy SP in Mumbai, Maharashtra. He brings a rare combination of ground-level investigative instinct and certified forensic audit expertise to every case he encounters.",
      {
        type: "question",
        text: "1. How has law enforcement shaped the way you think about financial crime and fraud patterns?",
      },
      "20+ years in law enforcement teach you one thing very quickly - facts don't speak for themselves. People do and People lie. Before I ever looked at a balance sheet through a forensic lens, I had already spent years reading rooms, reading behaviour, reading what wasn't being said. That instinct is something a classroom cannot manufacture. When I pursued the CFE, it gave structure to what I had already been doing intuitively - it gave me the language, the framework, and the methodology to translate field observations into findings that hold up under scrutiny. Law enforcement taught me to see. CFE taught me to prove. Together, they create a perspective that neither discipline builds alone.",
      {
        type: "question",
        text: "2. As someone who has worked in field investigations, what does a fraud pattern actually look like on the ground - not in a spreadsheet, but in real life?",
      },
      "In the field, fraud rarely announces itself through numbers first. It announces itself through people. A vendor contact who only communicates through one employee. A manager who volunteers to handle approvals when colleagues are unavailable. An executive who becomes visibly uncomfortable when a routine process gets a second pair of eyes. These are the signals that precede the financial trail - sometimes by months. The transactions confirm what the behaviour already told you. What separates experienced investigators from capable ones is this: they have trained themselves to treat human signals as primary evidence. The spreadsheet is where you build the case. The ground is where you find it.",
      {
        type: "question",
        text: "3. What was the moment or case that made you realise forensic audit thinking would make you a sharper investigator?",
      },
      "There was a case early in my career, a procurement irregularity everyone around me treated as a paperwork issue. Amounts were within policy. Approvals existed. On paper, nothing was wrong. But something didn't sit right. I kept pulling threads, and what appeared to be an administrative oversight turned out to be a structured scheme running for over two years. The problem was, instinct alone couldn't build a watertight case. I needed a framework to translate what I was seeing into something that would hold up under scrutiny. That is precisely what the CFE gave me. It didn't change what I noticed. It changed what I could do with it. Seniority gives you instinct. Certification gives you the structure to act on it.",
      {
        type: "question",
        text: "4. If you had to teach a room full of aspiring investigators one thing about pattern thinking that no textbook covers - what would it be?",
      },
      "In every investigation I have been part of, the most important moment was not when the evidence confirmed the fraud - it was the earlier moment when something felt wrong but could not yet be proven. Most professionals rush past that moment. They look for certainty before they commit to a direction. Pattern thinking requires the opposite - the willingness to sit with \"something is off here\" and follow that feeling methodically, even when you cannot yet articulate why. The instinct that something doesn't fit is not unprofessional. It is the beginning of every investigation that matters. The skill is not in finding the answer. It is in trusting the question long enough to find it.",
      {
        type: "question",
        text: "5. In your experience, what are the most common hidden patterns that repeatedly appear across fraud cases, patterns that seem invisible at first but are obvious in hindsight?",
      },
      "After decades of investigations, certain patterns repeat with remarkable consistency. Transactions clustering at month-end or just before an audit cycle. Approval chains where one name appears too frequently across too many high-value decisions. Amounts that land just below thresholds - not once, but repeatedly, across multiple vendors. And perhaps most telling - the same individuals always present at the point where controls are weakest. In hindsight, these signals are obvious. The question investigators must answer honestly is: why weren't they obvious in real time? Almost always, the answer is the same. Someone saw the signal and didn't follow it. Pattern thinking is not about intelligence. It is about discipline - the discipline to treat small anomalies as seriously as large ones, before hindsight makes that decision easy.",
      {
        type: "question",
        text: "6. Fraudsters deliberately break patterns to avoid detection. How do experienced investigators think when the pattern itself has been hidden intentionally?",
      },
      "When a fraudster deliberately breaks their own pattern, they inevitably create a new one. The absence of documentation where documentation should exist. Timestamps that don't align. Approval sequences that are technically complete but internally inconsistent. I have learned to treat missing information as evidence - not as a gap. If a process that should generate a paper trail suddenly doesn't, that silence is louder than any transaction. Experienced investigators cross-reference everything, not to find what is there, but to map what should be there and isn't. Deliberate concealment always leaves its own trail. It simply requires someone trained to look for what is missing, not only for what is present.",
      {
        type: "question",
        text: "7. There is a difference between an auditor who checks compliance and one who hunts for hidden patterns. In your view, what separates these two kinds of professionals?",
      },
      "The compliance auditor asks: Is this correct? The pattern hunter asks: Why does this exist? That single shift in questioning changes everything. I have worked alongside both types of professionals throughout my career, and the difference is never about knowledge or qualification. It is entirely about mindset. A compliance auditor follows a checklist to its end and signs off when the boxes are ticked. A pattern hunter treats the clean checklist as a reason to look harder, because fraud is specifically designed to pass routine scrutiny. The real separator is comfort with ambiguity. Pattern hunters are willing to sit with an unanswered question and follow it. Compliance auditors are trained to resolve questions quickly and move on. One closes files. The other opens investigations.",
    ],
  },
];

export const vol03IssueSections = [
  {
    label: "01",
    title: "Cover Story",
    heading: "The Anatomy of Deception",
    subheading: "How Fraud Is Built, Hidden, and Found",
    description: "The call came from a supplier who had never been paid. According to the company’s ledger, he had been paid in full, eleven times over eighteen months. The money had left the account every time. It just had never reached him.",
    descriptionContent: rt(b("The call came from a supplier who had never been paid. "), "According to the company’s ledger, he had been paid in full, eleven times over eighteen months. The money had left the account every time. It just had never reached him."),
    image: "vol3_cover_story.webp",
    fallbackImage: "cover_story.webp",
    imageWidth: "470px",
    icon: "Icon1.webp",
    bodyLabel: "",
    fullContent: [
      "The call came from a supplier who had never been paid.",
      "According to the company’s ledger, he had been paid in full, eleven times over eighteen months. The money had left the account every time. It just had never reached him.",
      "What follows is an illustrative composite, not a single real case. It is assembled from patterns that investigators meet again and again. Call the person at its centre Rakul, a senior accounts payable manager with eleven years at the company. He was trusted, punctual and the first to volunteer at year-end. By every visible measure, he was exactly the colleague an organisation hopes to have.",
      "His fraud did not begin with the first false payment. It began years earlier, in a place no audit program tests: a private problem.",
      {
        type: "heading",
        text: "Stage 1: Motive"
      },
      "No fraud starts with a plan. It starts with pressure, usually private and usually hidden. A debt that grows quietly. A lifestyle that has outrun a salary. Then comes the step that matters most: the person finds a reason why it is acceptable. I’ll put it back. They owe me. Nobody is hurt.",
      "Motive cannot be audited, but its traces can be read. The ACFE’s 2026 study of 2,402 real cases found that 84% of fraudsters showed at least one behavioural red flag before they were caught. Living beyond one’s means was the most common, seen in almost 40% of cases, and it has topped that list in every edition since 2008. Those who showed a flag caused median losses 33% higher than those who did not.",
      "Rakul showed two of them. Nobody was looking.",
      {
        type: "heading",
        text: "Stage 2: Opportunity"
      },
      "Motive alone is not enough. For fraud to happen, there must be an opportunity, and sometimes the organisation unknowingly provides it. Rakul’s role gave him two important powers. He could change a supplier’s bank details, and he could release payments to that same supplier. There was no independent check between the two steps.",
      "Nothing about this arrangement was deliberately hidden. Rakul knew the system, people trusted his judgement, and nobody had questioned whether one person should control both stages.",
      "This is how a routine process can become a serious vulnerability. A control may exist on paper, but if the same person can change information and move money without independent review, the control may offer little protection.",
      {
        type: "insight",
        text: "Case File Note: Motive is explored further in “Inside the Fraudster’s Head”, pg. 22–23."
      },
      {
        type: "heading",
        text: "Stage 3: Method"
      },
      "Then comes the act itself, and it is usually unremarkable. Rakul took a genuine supplier that had been inactive for months. He changed its registered bank account to one he controlled. Whenever a legitimate invoice arrived, he routed the payment there.",
      "There were no hacked systems and no forged signatures at the moment of payment. It looked like routine vendor maintenance.",
      "That is what makes many workplace frauds difficult to spot. Investigators may find no dramatic system breach or obviously fabricated invoice. Instead, the warning sign sits in a seemingly ordinary change to supplier information and a transaction that looks reasonable when viewed in isolation.",
      "In this case, the question was whether the bank details were legitimate, who had changed them, and whether that change had been independently verified. Following the money matters, but so does tracing the decisions and changes that allowed it to move.",
      {
        type: "heading",
        text: "Stage 4: Concealment"
      },
      "The act is only half a fraud. The other half is the effort to keep it from being seen.",
      "Rakul printed a vendor letter on a letterhead he had copied, requesting the change of bank details, and filed it in the vendor folder. Should anyone ask, the paperwork existed. At every month-end, he made sure he was the one preparing the vendor reconciliation, so the one person who could have spotted the problem was the one person writing the report on it.",
      "This is what concealment looks like in practice. Almost every fraud comes with some form of cover-up, and a forged or altered paper trail remains the favourite, even in a digital age.",
      "Time is the fraudster’s real asset. Every month the scheme stays hidden, it grows more comfortable and more costly. The goal is to stay unquestioned long enough.",
      {
        type: "heading",
        text: "Stage 5: Detection"
      },
      "Rakul was not caught by an audit. He was caught by a phone call.",
      "This is how most frauds surface. The honest supplier, wondering why a payment never arrived, asked a simple question, and one question was enough to unravel eighteen months of work.",
      "Detection method matters enormously. The ACFE found that fraud can be uncovered up to four times faster through active detection than through passive means. Active detection means a deliberate check such as surveillance, monitoring, or reconciliation. Passive detection means being told, stumbling across it, or being notified by the police.",
      "Data analytics, exception reports, independent reconciliations and accessible reporting channels can all help surface these issues earlier. But the information must reach someone willing and able to act on it.",
      {
        type: "insight",
        text: "Control Gap: Ask of any process: can one person initiate, approve, and release? If the answer is yes, you have found an opportunity."
      },
      {
        type: "heading",
        text: "Stage 6: Consequences"
      },
      "The loss is only the first line of the bill.",
      "Few organisations recover everything that was taken. The money is spent, moved, or untraceable, and the legal route is slow and expensive. Many organisations also choose to handle fraud quietly, preferring an internal dismissal to a public case, because they fear the publicity.",
      "Then come the costs that never appear in the stolen amount. Regulators and auditors ask difficult questions. Morale drops. Suppliers start to wonder how well they are being treated. The team that trusted Rakul has to rethink what trust means. And the organisation builds, after the fact, the controls it could have installed before.",
      {
        type: "heading",
        text: "What This Means for the Auditor"
      },
      "Look back at Rakul’s case. The motive was visible in behaviour. The opportunity was visible in a process map. The method was visible in a vendor master change log, the concealment in a document that did not match its own sequence, and the detection in a supplier’s complaint that should have been a control.",
      "Every stage left evidence. None of it was hidden. It was just never put together.",
      {
        type: "heading",
        text: "Closing Insight"
      },
      {
        type: "insight",
        text: "Fraud is built in stages. It is only ever found when someone reads those stages together. A transaction tells you what happened. The anatomy tells you why it was possible. The auditor’s job is to study the second, so the first never gets the chance."
      },
      "To see these six stages applied to a real, fully documented case, turn to Case File 01 on page 34."
    ]
  },
  {
    label: "02",
    title: "Case Study",
    heading: "Inside the $20 Million Fraud Allegations",
    subheading: "CASE FILE 01: Telekom Malaysia",
    description: "How Alleged Manipulation of Transactions, Supplier Records, Payroll, and Digital Identity Reveals Important Lessons for Auditors.",
    descriptionContent: rt(b("How Alleged Manipulation "), "of Transactions, Supplier Records, Payroll, and Digital Identity Reveals Important Lessons for Auditors."),
    image: "vol3_case_study.webp",
    fallbackImage: "case_study.webp",
    imageWidth: "470px",
    icon: "Icon4.webp",
    bodyLabel: "Case Overview:",
    fullContent: [
      "How Alleged Manipulation of Transactions, Supplier Records, Payroll, and Digital Identity Reveals Important Lessons for Auditors.",
      {
        type: "heading",
        text: "Case at a Glance"
      },
      {
        type: "insight",
        text: rt(b("Organisation: "), "Telekom Malaysia Berhad and its U.S. subsidiary, Telekom Malaysia (USA) Inc. | ", b("Public announcement: "), "19 May 2026 | ", b("Period covered: "), "July 2020–February 2026 | ", b("Amount involved: "), "More than US$20 million allegedly diverted | ", b("Central Themes: "), "Corporate fraud, procurement, payroll, fabricated records, and AI-assisted impersonation")
      },
      {
        type: "heading",
        text: "The Photograph That Didn't Match the Date"
      },
      "In January 2026, according to the U.S. Department of Justice (DOJ), the defendants sought reimbursement for expenses associated with a supposed work trip to Las Vegas in December 2025. The DOJ alleges that no such trip had taken place.",
      "When the parent company requested photographs, the defendants allegedly arranged a later trip to Las Vegas and photographed scenes with Christmas trees to make the images appear as though they had been taken in December.",
      "The detail is striking, but the underlying issue is serious: supporting evidence can appear convincing without proving that the activity it represents actually occurred.",
      {
        type: "heading",
        text: "The Setting"
      },
      "A subsidiary sits far from head office. The parent in Malaysia relied on reports, approvals, and paperwork from the US team, and the three managers held senior positions there from July 2020 to February 2026.",
      "At a distance, trust travels by document: a signature, an invoice, an HR record, a photograph. As the DOJ describes it, each alleged scheme aimed at one of those documents.",
      "This is why the case is useful to study. Many organisations run on the same arrangement: a head office, a remote unit and a stream of paperwork between them. The question for an auditor is simple. If the paperwork were wrong, which control would notice?",
      "The case is particularly relevant to audit and fraud investigation professionals because the alleged schemes touched several business functions. Rather than relying on one type of transaction, the alleged conduct involved commercial contracts, procurement, human resources, and employee expenses.",
      {
        type: "heading",
        text: "Four Alleged Schemes, One Investigation"
      },
      "1. Broadband-Capacity Sales: Selling network capacity without the required parent-company authorisation and diverting proceeds.",
      "2. Supplier Impersonation: Misrepresenting equipment costs and directing funds to a company resembling a genuine supplier.",
      "3. Payroll Diversion: Diverting salaries belonging to former employees or interns, including through impersonation.",
      "4. Fabricated Expenses: Seeking reimbursement for a business trip that did not take place and later creating photographs to support the claim.",
      "Each alleged scheme involved a different business process, but the underlying concern was similar: information presented to the organisation did not accurately reflect the activity behind the transaction.",
      {
        type: "disclaimer",
        text: "Source: U.S. Department of Justice, 19 May 2026."
      },
      {
        type: "heading",
        text: "How the Alleged Schemes Worked"
      },
      {
        type: "heading",
        text: "Scheme 1: Unauthorised Broadband-Capacity Sales"
      },
      "Telekom Malaysia (USA) Inc. primarily sells access to broadband infrastructure to technology companies in the United States. According to the DOJ, the parent company relied on the subsidiary’s management for information about U.S. deals and approved major contracts on that basis.",
      "Prosecutors allege that the defendants arranged sales involving broadband capacity without the parent company’s authorisation, used different contract versions to represent the transactions differently and directed proceeds from certain sales through a sham entity.",
      "From an audit perspective, this allegation highlights the importance of reconciling commercial agreements with actual quantities sold, customer contracts, billing records and revenue received.",
      {
        type: "insight",
        text: "The Audit Lesson: Approval should be supported by independent verification of the underlying transaction, including quantities, pricing, contractual terms and the destination of funds."
      },
      {
        type: "heading",
        text: "Scheme 2: Supplier Impersonation and Payment Diversion"
      },
      "The DOJ also alleges that the defendants impersonated a legitimate supplier and diverted a payment intended for that supplier.",
      "In the example described by prosecutors, the subsidiary purchased cable for approximately US$500,000, but the parent company was allegedly told that the purchase had cost approximately US$2.9 million. The DOJ alleges that approximately US$2.9 million was diverted to a bank account belonging to a sham entity with a name resembling that of the genuine supplier.",
      "The important investigative issue is the gap between what the company was told, what it actually purchased, and where the money went.",
      "An auditor examining a similar risk would compare supplier invoices with purchase orders, delivery records, contract prices, and payments. Supplier identity should be independently verified, particularly when bank details change, or a new entity appears in the payment chain.",
      {
        type: "insight",
        text: "The Audit Lesson: A familiar supplier name and complete-looking documentation are not enough. Verify the legal entity, commercial terms, delivery evidence and bank-account ownership independently."
      },
      {
        type: "heading",
        text: "Scheme 3: Salary Diversion and AI-Assisted Impersonation"
      },
      "Payroll controls depend on accurate employee records, authorised changes and reliable communication between HR and finance.",
      "According to the DOJ, the subsidiary's records did not reflect a particular employee's departure in 2020. Prosecutors allege that the employee's monthly salary continued to be paid into an account controlled by the defendants from August 2020 through May 2025.",
      "When the departure was finally recorded in 2025, HR in Malaysia requested an exit interview. The DOJ alleges that another individual impersonated the former employee and that, during a subsequent video call, an AI program was used to make the impersonator's appearance resemble the former employee.",
      "This part of the case brings an emerging risk into focus: identity verification cannot depend entirely on a familiar face appearing on a video call.",
      "AI-assisted impersonation also reinforces the need for layered verification. A video call may provide useful information, but it should not be treated as conclusive proof of identity when the request involves sensitive employee or financial records.",
      {
        type: "insight",
        text: "The Audit Lesson: Connect HR records with payroll data, independently verify changes, and use more than one reliable method to confirm identity."
      },
      {
        type: "heading",
        text: "Scheme 4: Fabricated Expense Reimbursements"
      },
      "The fourth allegation concerned reimbursements for work expenses that had not genuinely occurred.",
      "The DOJ states that the defendants sought reimbursement for a supposed work trip to Las Vegas in December 2025. When photographs were requested as supporting evidence, prosecutors allege that a later trip was organised to create photographs that appeared consistent with the claimed travel period.",
      "This example illustrates why the presence of supporting documents does not automatically establish that an expense is genuine. Photographs, receipts and claim forms must be considered alongside other evidence.",
      "An auditor reviewing travel expenses might compare the claim with travel authorisations, booking records, payment evidence, meeting schedules and the timing of supporting material. Where inconsistencies arise, the appropriate response is further verification.",
      {
        type: "insight",
        text: "The Audit Lesson: Evidence should be corroborated. A document may support a claim, but the wider timeline and independent records must also make sense."
      },
      {
        type: "heading",
        text: "Detection, Response and Professional Lessons"
      },
      {
        type: "heading",
        text: "What Auditors and Investigators Can Learn"
      },
      "1. Connect Information Across Departments: Procurement, finance, HR and operations may each hold only part of the relevant information. Comparing records across functions can reveal inconsistencies that individual reviews may miss.",
      "2. Verify Changes Independently: Changes to supplier bank details, employee status, contract quantities and payment instructions should be checked through authorised, independent channels.",
      "3. Examine the Full Transaction Trail: Investigators should establish who initiated a transaction, who approved it, what supporting evidence existed, and where the money ultimately went.",
      "4. Test the Evidence, Not Just its Presence: A signed document, photograph or completed form does not automatically prove that the underlying activity occurred. Dates, sources, and supporting records should be consistent.",
      "5. Strengthen Identity Verification: As impersonation techniques evolve, organisations should use layered identity checks for sensitive HR and financial processes rather than relying solely on video calls or familiar contact details.",
      "6. Encourage Reporting and Follow-Through: Employees should know how to raise concerns, and reports should be assessed promptly and objectively. An investigation should also examine whether weaknesses elsewhere could create similar risks.",
      {
        type: "heading",
        text: "The Bigger Lesson"
      },
      "This case illustrates how alleged fraud can exploit the spaces between business processes. The risk becomes clearer when records are checked against independent evidence and against one another.",
      "For auditors, the objective is not to assume wrongdoing whenever an inconsistency appears. It is to ask the right questions, verify the facts, preserve relevant evidence, and escalate concerns through appropriate procedures.",
      {
        type: "heading",
        text: "Closing Insight"
      },
      {
        type: "insight",
        text: "Effective fraud prevention depends on more than having controls in place. It requires controls that are independently verified, information that is connected across functions, and professionals who are willing to investigate when the evidence does not add up."
      },
      {
        type: "disclaimer",
        text: rt(bi("Disclaimer: This case study is presented solely for educational purposes to identify governance failures, audit gaps, and financial risk lessons drawn from documented fraud patterns. All details are sourced from the U.S. Attorney's Office, Southern District of New York, press release."))
      }
    ]
  },
  {
    label: "03",
    title: "Learning Topic",
    heading: "Phishing – When Deception Lands in Your Inbox",
    subheading: "",
    description: "One email. One convincing story. One click that could expose an entire organisation. Discover how modern social engineering exploits routine workflows, and how layered defence keeps systems secure.",
    descriptionContent: rt(b("One email. One convincing story. "), "One click that could expose an entire organisation. Discover how modern social engineering exploits routine workflows, and how layered defence keeps systems secure."),
    image: "vol3_learning_topic.webp",
    fallbackImage: "learning_topic.webp",
    imageWidth: "470px",
    icon: "Icon3.webp",
    bodyLabel: "",
    fullContent: [
      "One email. One convincing story. One click that could expose an entire organisation.",
      "An email arrives on a busy morning from your bank, asking you to verify your account, or a supplier shares an updated invoice. Or your manager requests a confidential file before an important meeting.",
      "Everything looks familiar. The sender’s name seems right. You have dozens of tasks waiting, so you act without giving it much thought.",
      "But Wait! What if the sender is an impostor?",
      "Welcome to phishing, a form of social engineering in which attackers disguise themselves as trusted people or organisations to trick recipients into revealing sensitive information, clicking malicious links, opening harmful attachments, or authorising fraudulent actions.",
      "The objective may be to steal login credentials, gain access to business systems, obtain financial information, or set the stage for a larger fraud. And the most convincing phishing attempts do not always look suspicious. They look like ordinary work.",
      "We often picture phishing as an email with suspicious links and promises that we have won a lottery. Those messages still exist. But modern phishing can be far more convincing. It can imitate familiar people, fit naturally into ongoing conversations, and exploit the way organisations actually work.",
      {
        type: "heading",
        text: "How Does a Phishing Attack Actually Work?"
      },
      "Most phishing attacks follow a simple pattern, even when the technology behind them is complicated.",
      "Step 1: Earn your trust. The attacker creates a believable identity or situation. They may imitate a colleague or sometimes use information gathered from public profiles, company websites, or earlier communications to make the message feel personal.",
      "Step 2: Give you a reason to act. The message creates a sense of urgency, curiosity, fear, or routine. You might be told that your account will be suspended or a senior leader is waiting for your response. The goal is to make acting feel easier than stopping to verify.",
      "Step 3: Get you to do something. You might be asked to open a file, enter login details, scan a QR code, reply with information, or approve an authentication request. The action may look completely ordinary.",
      "Step 4: Turn that action into an opportunity. Depending on the attack, the attacker may obtain credentials, access a mailbox, steal a session token, gather sensitive information, or influence a business transaction.",
      "Step 5: Use the access or trust gained. This is where the impact can grow. An attacker with access to one mailbox may impersonate its owner, contact suppliers, search for financial information, or send further messages to colleagues.",
      {
        type: "heading",
        text: "Let’s Burst the Biggest Myth!"
      },
      "Some of the most dangerous assumptions about phishing are the ones that sound reasonable. “If I clicked the link, my account is already compromised.”",
      "Not necessarily. Clicking a link does not automatically mean an attacker has gained access to your account or device. The result depends on what happened next, what the page contained, and whether any security weakness was exploited.",
      "Opening a page and closing it without entering information is different from submitting a password to a fake login page. Approving an unexpected sign-in request or downloading and running a malicious file creates different risks.",
      {
        type: "heading",
        text: "Let Us Dig Deeper into This Myth"
      },
      "Suppose an employee clicks a link in an email that appears to come from the organisation’s IT team. The page asks them to sign in. They enter their username and password, and the page displays an error. They close the browser and carry on working.",
      "From the employee’s point of view, nothing happened. From the attacker’s point of view, the credentials may already have been captured.",
      "In some attacks, the attacker goes further. A technique known as adversary-in-the-middle (AitM) phishing allows an attacker to position themselves between a user and a legitimate sign-in service. If the attack succeeds, the attacker may capture not only login details but also a session token.",
      "In simple terms, a session token can act like proof that a user has already signed in. Stealing it may allow an attacker to misuse an authenticated session, even when the organisation uses multi-factor authentication (MFA).",
      "And once an account is compromised, the attack may become harder to recognise. The lesson? Investigating phishing means asking what happened after the message was opened, not stopping at the fact that someone clicked.",
      "Did the user enter credentials? Was an unexpected sign-in approved? Did a new session appear? Were messages sent from the account? Was sensitive information accessed? Did any payment or approval follow?",
      {
        type: "heading",
        text: "Modern Ways of Phishing"
      },
      "For two decades, that action was a link. A phishing email without a link had nothing to deliver, so it was not worth sending. Hence the working rule most of us learned: no link, no phishing; no click, no compromise, but what if there is no link at all?",
      "There are modern ways of Phishing also; here you can be asked to scan a QR code, call a number, share a one-time password, or approve a sign-in request. The method may change, but the intention remains the same - Deception. Let’s look at how this works across different channels.",
      {
        type: "heading",
        text: "01. Smishing = SMS + Phishing"
      },
      "You receive a text message: “Delivery alert: Your parcel is on hold because your address is incomplete. Update your details within two hours to avoid return.”",
      "This is smishing, a form of phishing carried out through SMS or other text messages. Attackers may pretend to be banks, delivery companies, government services, or familiar contacts. Their aim could be to steal personal details, capture login credentials, or trick you into making a payment.",
      {
        type: "heading",
        text: "02. Quishing: QR Code + Phishing"
      },
      "Imagine receiving an email that appears to come from your company’s IT team. It asks you to scan a QR code to keep your Microsoft 365 account active or access an important company document.",
      "The email looks genuine, and the request seems routine. You scan the code, a sign-in page opens, and you enter your work credentials.",
      "This is quishing - phishing that uses QR codes to direct people to fraudulent websites or other harmful destinations. Unlike a normal link, a QR code does not make its destination easy to see at first glance.",
      "In a workplace, attackers may use QR codes to imitate IT notifications, document-sharing requests, or account verification messages. If an employee enters their work credentials on a fake page, the attacker may attempt to access company email, files, or other business information.",
      {
        type: "heading",
        text: "03. Vishing = Voice Call + Phishing"
      },
      "Your phone rings. “Hello, I’m calling from your bank’s security team. We have detected a suspicious transaction on your account. I need to verify a few details to protect your money.”",
      "The caller sounds professional. They know your name and may even mention a recent transaction. Then comes the pressure: act immediately, share a one-time password, or follow instructions on your phone.",
      "This is vishing, or voice phishing. Attackers use phone calls or voice messages to persuade people to reveal confidential information, transfer money, or provide access to accounts and systems.",
      {
        type: "heading",
        text: "The Defence System: Stop the Message, Protect the Account, Respond Quickly"
      },
      "Imagine a phishing email reaches an employee’s inbox. The email filter misses it. The employee clicks the link and enters their login details. What happens next?",
      "Does the attacker gain access without being noticed? Can the organisation detect the unusual sign-in? Can the employee report the incident quickly? And can the security team stop the attack before it spreads?",
      "These questions explain why phishing defence needs more than a single security tool or an annual training session. It needs layers of protection, with each layer reducing the chance that one mistake becomes a serious incident.",
      {
        type: "heading",
        text: "Layer 1: Stop Suspicious Messages Before They Reach People"
      },
      "The first line of defence is the organisation’s email security system. Its job is to identify suspicious messages, block known threats and make dangerous content harder to access.",
      "Email filters can check links, scan attachments, flag suspicious sender names and examine messages for signs of fraud. Some systems can also check links again when a user clicks them, because a website that looked curious when the email arrived may become dangerous later.",
      "Organisations can also use email authentication methods such as SPF, DKIM and DMARC. In simple terms, these help receiving systems check whether an email is authorised to use a particular sending domain and whether it shows signs of tampering. When configured properly, they can reduce certain types of sender impersonation.",
      {
        type: "heading",
        text: "Layer 2: Make Sure One Click Does Not Open Every Door"
      },
      "Even the best email filters can miss a threat. That makes account security the next important layer.",
      "Organisations should use Multi-Factor Authentication (MFA), which requires an additional step beyond a password when signing in. Where possible, they should consider phishing-resistant options such as passkeys or security keys, which are designed to prevent credentials from being used on fake websites.",
      "Access should be limited to what people need for their roles, so that one compromised account does not automatically provide access to everything.",
      "MFA is valuable, but not all forms offer the same level of protection against every phishing technique. Some attacks can trick users into approving a sign-in or capture an active login session.",
      "The goal is simply to make it harder for a stolen password or compromised account to become a route into the wider organisation.",
      {
        type: "heading",
        text: "Layer 3: Make Reporting and Response Easy"
      },
      "Suppose an employee realises they have clicked a suspicious link or shared their credentials. They should not have to search through policy documents to find out what to do.",
      "A simple phishing-reporting button, clear instructions, and a supportive reporting culture can help employees raise concerns quickly. The security team should be able to investigate the message, remove it from other inboxes where possible, check for suspicious account activity, and take steps to contain any compromise.",
      "Importantly, reporting should not depend on a suspicious message containing a link or attachment. An employee who receives a fraudulent payment request or a suspicious message asking them to call a number should still be able to report it.",
      "Speed matters because the earlier an organisation knows about an attempted attack, the sooner it can investigate and limit the damage.",
      {
        type: "heading",
        text: "Train People and Strengthen the Systems Around Them"
      },
      "Technology can block many threats, but it cannot make every decision for an employee. Effective training should use situations people may actually face: an unexpected refund message, a QR code requesting a login, a call claiming to be from the bank, or an urgent request from the CEO.",
      "Training also needs to stay current, and regular refreshers and lessons drawn from real incidents can keep the guidance relevant.",
      "Alongside training, IT teams use security tools to watch for suspicious activity across the organisation’s network and systems.",
      "Two more points make training work:\n• Reward reporting: Someone who is scolded for clicking will hide the next click. The hidden click is the one that becomes a breach.\n• Train the IT team too: Run practice drills where an alert fires and the team must investigate, block, and sign users out within minutes.",
      "An Intrusion Detection System (IDS) monitors activity and alerts the security team when it identifies signs of a possible attack. An Intrusion Prevention System (IPS) can take action to block certain suspicious traffic. Depending on how they are configured, these tools may help detect or stop activity linked to malicious connections, malware, or attempts to access systems without permission.",
      {
        type: "insight",
        text: "Staff need one habit that works every time: verify through a second channel that you started yourself, using a number or address you already trust."
      }
    ]
  },
  {
    label: "04",
    title: "Expert Talk",
    heading: "Why Fraud Survives Good Controls: The Gaps Organisations Still Miss",
    subheading: "",
    description: "Lalitha Satheesh, M.Com., CA, CS, CFE, CIA, CISA, CRMA, is a Managing Director at Accenture with over 25 years of experience in audit, internal controls, fraud risk, compliance, governance, and risk management. A proud AIA achiever, she shares her insights in this edition of AIA Times on why fraud persists despite established controls and how organisations can strengthen fraud risk management and prevention.",
    descriptionContent: rt(b("Lalitha Satheesh, M.Com., CA, CS, CFE, CIA, CISA, CRMA,"), " is a Managing Director at Accenture with over 25 years of experience in audit, internal controls, fraud risk, compliance, governance, and risk management. A proud AIA achiever, she shares her insights in this edition of AIA Times on why fraud persists despite established controls and how organisations can strengthen fraud risk management and prevention."),
    image: "vol3_expert_talk.webp",
    fallbackImage: "expert_talk.webp",
    imageWidth: "470px",
    icon: "Icon2.webp",
    bodyLabel: "Lalitha Satheesh,",
    fullContent: [
      "Lalitha Satheesh, M.Com., CA, CS, CFE, CIA, CISA, CRMA, is a Managing Director at Accenture with over 25 years of experience in audit, internal controls, fraud risk, compliance, governance, and risk management. A proud AIA achiever, she shares her insights in this edition of AIA Times on why fraud persists despite established controls and how organisations can strengthen fraud risk management and prevention.",
      {
        type: "question",
        text: "1. From your experience, what is the difference between a control that is well-designed on paper and one that actually works in day-to-day operations?"
      },
      "A control can be well-designed but poorly executed. It can also be performed consistently yet fail to address the underlying risk because the design itself is inadequate.",
      "Effective controls require three things:\n• Right design: Does the control adequately address the risk?\n• Reliable execution: Is it performed consistently as intended?\n• Demonstrable outcomes: Does it prevent, detect, or correct what it is supposed to?",
      "An organisation may have a well-defined approval process, but if employees bypass it to save time or managers approve things without looking at the details, the control is not really serving its purpose. A control should not just look good in a policy document. It should work consistently, even when there is pressure to meet deadlines or achieve business targets. It is also important to check whether people understand why the control exists, rather than simply treating it as another step in the process.",
      {
        type: "question",
        text: "2. What are some warning signs that an organisation's control environment may be creating a false sense of security?"
      },
      "One warning sign is when people start assuming that everything is fine merely because policies are in place or audit reports look good. These are positive signs, of course, but they do not automatically mean that fraud cannot happen.",
      "I would pay attention to recurring exceptions, the same people controlling too many steps in a process, or audit findings that recur without being properly resolved. Another concern is when employees are reluctant to question a decision because a higher-up has already approved it.",
      "Sometimes, the problem is not that controls are missing, but that people have become too comfortable with the way things are done. Organisations need to keep asking questions and address weaknesses instead of assuming that existing processes are working perfectly. Finally, when the underlying governance is weak , reporting can show all green and the control incidents may never get the attention its needed, therefore awareness on what are the key metrics and transparency on how is it reported is crucial to avoid false sense of security.",
      {
        type: "question",
        text: "3. Many processes rely on employees following procedures correctly. How can organisations reduce their dependence on individual judgement without unnecessarily complicating processes?"
      },
      "The goal is not to eliminate human judgement, but to reduce redundant discretion and make the right action the easiest action.",
      "Organisations can achieve this through clear accountability, role-based access, segregation of duties and risk-based approvals. Technology can strengthen these controls by automatically flagging unusual transactions, supplier changes and recurring exceptions.",
      "The principle is simple: simplify routine decisions, automate predictable controls and reserve human judgement for higher-risk exceptions. Good controls should make processes safer, not slower.",
      {
        type: "question",
        text: "4. Can high policy compliance or a clean audit report sometimes create misplaced confidence? How should organisations interpret these signals?"
      },
      "Yes, absolutely. A clean audit report is encouraging, but it should not be treated as a guarantee that there is no fraud. Every audit has a defined scope, and there may be areas or transactions that were not examined in detail.",
      "Similarly, employees may be following the existing policies correctly, but that does not necessarily mean those policies are addressing every relevant risk. This is why professional scepticism is so important.",
      "Organisations should look at what was tested, whether earlier issues were genuinely resolved, and whether new risks have emerged since the last review. It is critical to constantly review the organisation risk management process to ensure new and emerging risk are assessed and impacted in to policies and procedures.",
      "I endorse leaders regularly questioning whether existing controls remain fit for purpose and identifying any unusual activity that may require closer scrutiny.",
      {
        type: "question",
        text: "5. When an investigation uncovers fraud, how can organisations distinguish between an isolated act of misconduct and a deeper weakness in the process or control environment?"
      },
      "I would examine fraud through the lens of the Fraud Triangle: Pressure, Opportunity and Rationalisation. While personal motives may explain why someone committed fraud, weaknesses in the control environment often explain how they succeeded.",
      "The investigation must therefore go beyond individual misconduct to assess control design, access rights, approval mechanisms, segregation of duties and historical exceptions.",
      "The critical distinction is whether the individual exploited an isolated lapse or a systemic vulnerability that others could exploit.",
      "Accountability addresses the individual; root-cause analysis and control remediation address the organisation.",
      {
        type: "insight",
        text: "My guiding principle is simple: Investigate the person, but fix the opportunity. Otherwise, we may close the case without closing the risk."
      }
    ]
  }
];

export const magazineIssues = [
  {
    id: "november-2026",
    issueDate: "November 2026",
    volume: "Vol. 03",
    category: "Magazine",
    title: "Fraud Files – The Anatomy of Deception",
    displayDate: "01 November 2026",
    description:
      "Explore the mechanics of deception, phishing defence in depth, lessons from the US$20M Telekom Malaysia case, and expert insights from Accenture Managing Director Lalitha Satheesh.",
    cover: "aia_times_magazine_cover_page_3.webp",
    fallbackCover: "coming_soon.webp",
    coverAlt: "AIA Times November 2026 Volume 3 cover",
    highlights: vol03IssueSections,
    isAvailable: true,
  },
  {
    id: "august-2026",
    issueDate: "August 2026",
    volume: "Vol. 02",
    category: "Magazine",
    title: "Uncovering Hidden Patterns-Audit that spots fraudsters",
    displayDate: "01 August 2026",
    description:
      "Uncover the hidden patterns behind fraud, decode complex data, and explore the investigative techniques that drive smarter decisions.",
    cover: "aia_times_magazine_cover_page.webp",
    fallbackCover: "coming_soon.webp",
    coverAlt: "AIA Times August 2026 cover",
    highlights: vol02IssueSections,
    isAvailable: true,
  },
  {
    id: "june-2026",
    issueDate: "June 2026",
    volume: "Vol. 01",
    category: "Magazine",
    title: "The Minds Behind The Money Trail",
    displayDate: "06 June 2026",
    description:
      "Discover expert insights, real-world investigations, and emerging trends shaping the future of forensic accounting and fraud examination.",
    cover: "aia_times_magazine.webp",
    coverAlt: "AIA Times June 2026 cover",
    highlights: issueSections,
    isAvailable: true,
  },
];

export const conversationItems = [
  {
    type: "Podcast",
    title: "What worked five years ago won't protect your career today.",
    date: "25 Jan 2026",
    description:
      "Puneet Garg, shares what truly drives stable career growth in today's digital world.",
    image: "podcast.webp",
    imageAlt: "AIA Times podcast conversation",
    href: "https://www.youtube.com/watch?v=VsiiekoW2Hg",
  },
  {
    type: "Interview",
    title: "Real Success Stories of CFE, CIA & CAMS Achievers",
    date: "",
    description:
      "AIA shares numerous success stories of its passout students who have earned credentials such as CFE, CIA, and CAMS.",
    image: "interview.webp",
    imageAlt: "CFE Success Story interview",
    href: "https://www.youtube.com/playlist?list=PLHH4EQbbvYIZSnYeZNB3-zoHdVGS6BvWV",
  },
];

export const flipbookPageSources = Array.from({ length: 8 }, (_, index) => {
  const page = index + 1;
  const padded = String(page).padStart(2, "0");
  const paddedThree = String(page).padStart(3, "0");

  return [
    `${LOCAL_AIA_TIMES_ASSET_BASE}/flipbook/page-${padded}.webp`,
    `${ASSET_BASE}/flipbook/page-${padded}.webp`,
    `${ASSET_BASE}/flipbook/page-${page}.webp`,
    `${ASSET_BASE}/flipbook/${page}.webp`,
    `${ASSET_BASE}/flipbook/${padded}.webp`,
    `${ASSET_BASE}/flipbook/${paddedThree}.webp`,
    `${ASSET_BASE}/flipbook/page_${padded}.webp`,
    `${ASSET_BASE}/flipbook/aia-times-${padded}.webp`,
    `${ASSET_BASE}/flipbook/aia_times_${padded}.webp`,
    `${ASSET_BASE}/flipbook/aia-times-magazine-${padded}.webp`,
    `${ASSET_BASE}/flipbook/aia_times_magazine_${padded}.webp`,
  ];
});

export function getImageBase(apiData, imageFor) {
  return (
    apiData?.image_url?.find((item) => item.image_for === imageFor)
      ?.image_url || ""
  );
}
