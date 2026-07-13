/**
 * Case study content — the single source of truth for all project copy.
 *
 * Every claim here is grounded in the public README / docs of each source
 * repository. Do not add metrics or responsibilities that are not documented
 * there. Numbers that depend on a dataset snapshot are phrased as approximate.
 *
 * To add a Spanish version later, create projects.es.ts with the same
 * Project[] shape and switch on the page's locale.
 */

export type ProjectLink = {
  label: string;
  href: string;
  /** Primary links render as buttons; secondary as text links. */
  primary?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  /** Short line used on cards and as the page subtitle. */
  tagline: string;
  /** e.g. "Individual project" / "Team thesis project (2 authors)". */
  authorship: string;
  /** Verifiable role/contribution. */
  role: string;
  status: "Published" | "Work in progress";
  timeframe: string;
  /** Card cover image (public path, without base). */
  cover: { src: string; alt: string; width: number; height: number };
  /** Rendered as a short notice on the card/page when present. */
  notice?: string;
  context: string;
  problem: string;
  process: string[];
  decisions: { title: string; body: string }[];
  results: string[];
  stack: string[];
  limitations: string[];
  links: ProjectLink[];
  /** Optional slot for an embedded demo video (EcoLima). */
  videoUrl?: string | null;
};

export const projects: Project[] = [
  {
    slug: "nyc-311-analytics",
    title: "NYC 311 Service Requests Analytics",
    tagline:
      "Exploratory and visual analysis of ~20.8 million NYC 311 service requests (2020–2026), from raw CSV to a published Tableau dashboard.",
    authorship: "Individual project",
    role: "Sole author: data profiling, cleaning, modeling, analysis, PCA and Tableau dashboard.",
    status: "Published",
    timeframe: "2026",
    cover: {
      src: "/images/projects/nyc-311-cover.svg",
      alt: "Stylized preview of the NYC 311 analytics dashboard: KPI cards, a borough bar chart and a trend line.",
      width: 1200,
      height: 675,
    },
    context:
      "NYC Open Data publishes every 311 service request since 2010. The snapshot used here (downloaded 2026-04-18) contains 20,855,981 rows and 44 columns covering 2020 to 2026 — too large to load naively on a local machine, and noisy enough that most columns cannot support analysis.",
    problem:
      "Which patterns in citizen complaints reveal operational inefficiencies in the municipal response — and how do they vary by problem type, agency and borough? The intended user is a 311 operations manager deciding where to audit processes and how to prioritize resources.",
    process: [
      "Profiled the raw dataset to test which analytical questions the data can actually answer: 6 questions were kept and 4 discarded (e.g. citizen satisfaction — the variable does not exist; bridge/poverty correlation — 90%+ nulls).",
      "Loaded the ~4 GB CSV in 50,000-row chunks with a restricted column set to keep memory manageable without Spark or cloud infrastructure.",
      "Cleaned the data with a logged transformation record (nulls, category homologation, duplicates) so every change is auditable.",
      "Modeled a star schema — a fact table plus dimensions — and exported consolidated sources ready to connect in Tableau.",
      "Built derived metrics, segments and parameters, then applied PCA and clustering on aggregated agency profiles (20 agencies × 9 numeric variables) as an independent check on the findings.",
      "Published a final dashboard with 4 KPIs and 6 analytical views, plus a technical QA document covering validation, WCAG contrast checks and known limitations.",
    ],
    decisions: [
      {
        title: "Median, not mean, for resolution time",
        body: "Mean resolution time is 211.6 h but the median is 7.1 h — a 30× gap caused by a heavily right-skewed distribution. Reporting the mean would misrepresent how agencies actually perform.",
      },
      {
        title: "PCA instead of t-SNE",
        body: "The advanced component runs on an aggregated profile of only 20 agencies. With a sample that small, t-SNE is unstable and hard to defend; PCA gives interpretable linear axes.",
      },
      {
        title: "15 of 44 columns",
        body: "12 columns are geographic detail redundant with latitude/longitude and 8 are sparse fields with >70% nulls. The 15 kept columns directly cover the 6 viable questions.",
      },
      {
        title: "Chunked ingestion over pd.read_csv",
        body: "The full CSV produces a 4+ GB DataFrame. Chunked loading with a restricted column set keeps the pipeline reproducible on a local machine.",
      },
    ],
    results: [
      "Published interactive Tableau dashboard (4 KPIs, 6 views) and a self-contained visual story on GitHub Pages.",
      "Key finding: 311 does not have a generalized slowness problem — the lag is concentrated in a cluster of 9 agencies (~8.4% of volume, median 615.7 h) while the NYPD cluster resolves 43.5% of volume with a 0.9 h median.",
      "PCA confirmed with independent evidence that the slowest agencies are not isolated cases but share the same operational profile.",
      "Methodology, metric definitions and QA are documented in the repository (decision log, PCA rules, technical QA).",
    ],
    stack: ["Python", "pandas", "NumPy", "scikit-learn", "Jupyter", "Tableau"],
    limitations: [
      "Row count (~20.8M) is tied to the 2026-04-18 snapshot; NYC Open Data updates the file daily, so re-downloads will differ.",
      "The residual \"Other\" problem category concentrates ~36% of volume — a limitation of the 311 taxonomy itself.",
      "PCA runs on only 20 agencies; conclusions from it are supporting evidence, not standalone proof.",
      "The dashboard's red/green status palette is not fully colorblind-safe (documented in the QA).",
    ],
    links: [
      {
        label: "View interactive dashboard",
        href: "https://public.tableau.com/app/profile/nikole.garcia/viz/Libro2_17838084521540/Final",
        primary: true,
      },
      {
        label: "View visual story",
        href: "https://nikole370.github.io/nyc-311-analytics/",
      },
      {
        label: "View source code",
        href: "https://github.com/Nikole370/nyc-311-analytics",
      },
    ],
  },
  {
    slug: "retail-sales-performance",
    title: "Retail Sales Performance Dashboard",
    tagline:
      "Executive Tableau dashboard answering one question: did the business meet its 2025 sales target while protecting profitability?",
    authorship: "Individual project",
    role: "Sole author: data model, calculated fields, dashboard design and case study documentation.",
    status: "Published",
    timeframe: "2025–2026",
    cover: {
      src: "/images/projects/retail-cover.svg",
      alt: "Stylized preview of the retail performance dashboard: KPI cards for sales, attainment and margin with a monthly target chart.",
      width: 1200,
      height: 675,
    },
    context:
      "A retail business needs a single executive view that combines sales, target attainment, margin, regional performance and year-over-year context — instead of scattered reports that answer each question separately.",
    problem:
      "Did the company meet its sales target profitably in 2025? The dashboard is built for a management audience: result first, location of the gap second, suggested action third.",
    process: [
      "Modeled a monthly sales fact table related to channel, product and region dimensions — 11,520 records across 2024 and 2025.",
      "Built calculated fields for target attainment, gross margin, year-over-year growth and percentage-point deltas, with parameter-driven year selection.",
      "Designed KPI cards with explicit comparison bases, a monthly actual-vs-target view, a regional table (sales, target, attainment, gap) and a regional margin view with YoY change.",
      "Used color semantically: teal for actual performance, gray for targets, green for improvement, red/amber for shortfalls.",
      "Documented the case study, calculated fields and design decisions in the repository.",
    ],
    decisions: [
      {
        title: "One business question, one screen",
        body: "Every view answers part of \"did we hit the target profitably?\". Anything that did not serve that question was left out of the executive view.",
      },
      {
        title: "Prior year as context, not mixed into KPIs",
        body: "2024 data appears only as a comparison base; current-year KPI values are never blended with prior-year figures.",
      },
      {
        title: "Descriptive, not causal",
        body: "The insight panel states results and where gaps concentrate. It deliberately avoids causal claims the data cannot support.",
      },
    ],
    results: [
      "2025 sales of S/ 163.0M, +22.1% vs. 2024 — strong growth, but target attainment closed at 89.4%, leaving a S/ 19.2M gap.",
      "Gross margin held at 41.4% (-0.9 pp vs. 2024); every region stayed profitable while regional margins slipped 0.7–1.0 pp.",
      "The gap is located, not just measured: July had the largest monthly shortfall (-14.2%), Oriente the lowest regional attainment (88.4%), Lima the largest absolute gap (-S/ 4.9M).",
    ],
    stack: [
      "Tableau Public",
      "Data modeling (fact + dimensions)",
      "Calculated fields & parameters",
      "Executive dashboard design",
      "Data storytelling",
    ],
    limitations: [
      "The analysis is descriptive; it identifies where gaps concentrate but does not attribute causality.",
      "The public repository documents the analysis but does not redistribute the source datasets.",
      "Dashboard language is Spanish (reporting period January–December 2025).",
    ],
    links: [
      {
        label: "View interactive dashboard",
        href: "https://public.tableau.com/app/profile/nikole.garcia/viz/Retail2025-Cumplimientodeventasyrentabilidad/Dashboard1",
        primary: true,
      },
      {
        label: "Read case study",
        href: "https://github.com/Nikole370/retail-sales-performance-tableau/blob/main/docs/CASE_STUDY.md",
      },
      {
        label: "View source code",
        href: "https://github.com/Nikole370/retail-sales-performance-tableau",
      },
    ],
  },
  {
    slug: "ecolima",
    title: "EcoLima — Recycling Point Recommendation Platform",
    tagline:
      "Thesis project (in progress): GIS + machine learning to support recommending recycling point locations across Lima Metropolitana — frontend, backend and an ML pipeline.",
    authorship:
      "Team thesis project — co-authored with Alexander Cantoral Sedamano (UPC, Taller de Proyecto).",
    role: "Primary owner of the machine learning component (LightGBM training pipeline, SHAP explainability, dataset preparation and the ML API contract). Supporting contributor to the FastAPI backend, the Vue 3 frontend and the Azure deployment.",
    status: "Work in progress",
    timeframe: "2026 — ongoing",
    cover: {
      src: "/images/projects/ecolima-cover.svg",
      alt: "Stylized map of Lima divided into a spatial grid, with cells shaded by recycling suitability score.",
      width: 1200,
      height: 675,
    },
    notice: "Authenticated demo — access available on request.",
    context:
      "EcoLima is a university thesis project (UPC) exploring how open geospatial data (OpenStreetMap), demographic data (INEI) and socioeconomic data (APEIM) can support deciding where to install recycling containers in Lima Metropolitana. It is one integrated system with three parts: a Vue 3 SPA, a FastAPI backend with PostgreSQL/PostGIS deployed on Azure, and a Python ML pipeline.",
    problem:
      "Municipal recycling points are placed without a systematic, explainable criterion. The intended approach scores cells of a 500 m × 500 m spatial grid (~11,000 cells over Lima) with a 0–1 suitability score, and explains each score by variable using SHAP — so a recommendation can be inspected, not just accepted.",
    process: [
      "ML pipeline (Nikole, primary): feature engineering from geospatial sources (osmnx, geopandas, PostGIS), LightGBM training and evaluation, SHAP TreeExplainer for per-cell explanations, and a documented pipeline with architecture decision records (LightGBM vs. XGBoost, binary classification vs. regression, spatial CV strategy).",
      "A simulated dataset was deliberately used to develop the pipeline, benchmark models and stabilize the ML API contract while real labeled data is still being collected — kept explicitly separate from thesis evidence.",
      "ML service exposes health, metadata, prediction and recommendation endpoints so the backend has a stable contract.",
      "Backend (team; Nikole supporting): FastAPI with PostgreSQL/PostGIS, deployed to Azure App Service, with model artifacts stored in blob storage.",
      "Frontend (team; Nikole supporting): Vue 3 single-page application consuming the backend, deployed as an Azure Static Web App behind authentication.",
    ],
    decisions: [
      {
        title: "LightGBM + SHAP over black-box alternatives",
        body: "The thesis requires recommendations a municipality could audit. Gradient boosting on tabular grid features with SHAP explanations keeps every score attributable to concrete variables.",
      },
      {
        title: "Simulated data for development, never as evidence",
        body: "Development datasets are labeled as simulated in the repo and used only to build the pipeline and API contract. Metrics obtained on simulated data are not presented as validation of the real system.",
      },
      {
        title: "Spatial grid instead of point-level prediction",
        body: "A 500 m grid gives a stable analysis unit, aligns heterogeneous data sources, and matches how placement decisions are actually made.",
      },
    ],
    results: [
      "Working end-to-end system: SPA → API → model, deployed on Azure (demo requires login).",
      "Documented ML pipeline with reproducible training scripts, model benchmarking notebooks and SHAP analysis.",
      "Real recycling-point data collected for two districts (Miraflores and Magdalena del Mar) as the starting point for progressive expansion.",
    ],
    stack: [
      "Python",
      "LightGBM",
      "SHAP",
      "geopandas / osmnx",
      "PostGIS",
      "FastAPI",
      "PostgreSQL",
      "Vue 3",
      "Azure",
    ],
    limitations: [
      "Work in progress: real-data coverage is currently limited to two districts of Lima; the full 500 m grid over the city is pending.",
      "Part of the development used simulated data; the real target variable is not yet validated, so no real-world accuracy is claimed.",
      "Spatial cross-validation is designed (ADR) but still pending implementation with multi-district data.",
      "This is co-authored team work; the contribution split above reflects the declared division of responsibilities.",
    ],
    links: [
      {
        label: "Request demo access",
        href: "mailto:nisgarcha@gmail.com?subject=EcoLima%20demo%20access%20request",
        primary: true,
      },
      {
        label: "ML pipeline repository",
        href: "https://github.com/TP202610101/ecolima-ml",
      },
      {
        label: "Backend repository",
        href: "https://github.com/TP202610101/ecolima-backend",
      },
      {
        label: "Frontend repository",
        href: "https://github.com/TP202610101/ecolima-frontend",
      },
    ],
    videoUrl: null,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
