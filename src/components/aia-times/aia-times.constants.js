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
  {
    title: "CFE 4-Day Residential Program",
    description:
      "Admissions open for AIA's exclusive 4-day CFE residential training program.",
    image: "time_cfe_resident_al_program.webp",
  },
];

export const issueSections = [
  {
    label: "01",
    title: "Cover Story",
    heading: "Decoding the Mindset Behind Every Financial Crime",
    subheading:
      "The biggest risk in financial crime isn\u2019t what is hidden. It\u2019s what looks normal.",
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
    heading: "The Toshiba Fraud Story:",
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

export const magazineIssues = [
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
  {
    id: "coming-soon",
    issueDate: "Coming Soon",
    volume: "Vol. 02",
    category: "Magazine",
    title: "Coming Soon",
    displayDate: "Coming Soon",
    description:
      "Future editions with more expert views, events, and industry updates.",
    cover: "coming_soon.webp",
    coverAlt: "AIA Times coming soon issue",
    highlights: [],
    isAvailable: false,
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
    title: "CFE Success Story - Meet Ms. Lakshmi Kolla",
    date: "20 May 2026",
    description:
      "Get inspired by the Ms. Lakshmi Kolla, CFE real-life success story with AIA!",
    image: "interview.webp",
    imageAlt: "CFE Success Story interview",
    href: "https://www.youtube.com/watch?v=S75ikx5OqOg",
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
