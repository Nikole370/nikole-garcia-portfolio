/**
 * Capabilities grouped by how they are actually used — not a technology cloud.
 * Each group points to the work that demonstrates it. No skill bars, no
 * arbitrary proficiency rankings.
 */

export type CapabilityGroup = {
  title: string;
  summary: string;
  items: string[];
  evidence: string;
};

export const capabilities: CapabilityGroup[] = [
  {
    title: "Analytics & BI",
    summary:
      "Turning raw data into decision-ready dashboards, with the methodology written down.",
    items: [
      "SQL for reporting and analysis",
      "Tableau: executive dashboards, calculated fields, parameters",
      "Dimensional modeling (star schema, fact + dimension tables)",
      "KPI design with explicit comparison bases",
      "Data storytelling and QA / methodology documentation",
    ],
    evidence:
      "Demonstrated in NYC 311 Analytics and the Retail Sales Performance dashboard.",
  },
  {
    title: "Data & Backend",
    summary:
      "Building the pipeline behind the dashboard: ingestion, cleaning, modeling and APIs.",
    items: [
      "Python: pandas, NumPy, scikit-learn, Jupyter",
      "ETL: chunked ingestion, cleaning logs, reproducible notebooks",
      "FastAPI services and REST API design",
      "PostgreSQL and PostGIS (geospatial queries)",
      "Applied ML: LightGBM and SHAP explainability (thesis work)",
    ],
    evidence:
      "Demonstrated in the NYC 311 pipeline and the EcoLima backend / ML component.",
  },
  {
    title: "Cloud & Delivery",
    summary:
      "Getting work shipped, deployed and debugged — at a junior, hands-on level.",
    items: [
      "AWS fundamentals; Azure App Service and Static Web Apps (project work)",
      "Docker containers and Kubernetes basics",
      "Git, GitHub and CI/CD with GitHub Actions",
      "Deployment troubleshooting (memory limits, startup configs)",
      "Technical writing: ADRs, decision logs, README-driven repos",
    ],
    evidence:
      "Demonstrated in EcoLima's Azure deployment and this site's own build pipeline.",
  },
];
