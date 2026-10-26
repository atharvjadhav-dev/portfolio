export interface SkillItem {
  name: string;
  category: string;
  tagline: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description: "Architecting, securing, and deploying scalable services on AWS.",
    skills: [
      { name: "AWS", category: "Cloud", tagline: "Core cloud provider for infrastructure deployments", highlight: true },
      { name: "IAM", category: "Cloud", tagline: "Least-privilege roles, policies, and service accounts" },
      { name: "Amazon EC2", category: "Cloud", tagline: "Compute sizing, security groups, and key pairs" },
      { name: "Amazon S3", category: "Cloud", tagline: "Static asset hosting, bucket policies, and lifecycle rules" },
      { name: "Amazon CloudFront", category: "Cloud", tagline: "Global CDN caching, TLS termination, and origin shielding" },
      { name: "Amazon Route 53", category: "Cloud", tagline: "DNS routing, health checks, and domain configuration" },
    ],
  },
  {
    id: "containers",
    title: "Containers & Orchestration",
    description: "Packaging portable services and managing multi-container application lifecycles.",
    skills: [
      { name: "Docker", category: "Containers", tagline: "Multi-stage builds, rootless containers, and image reduction", highlight: true },
      { name: "Docker Compose", category: "Containers", tagline: "Local orchestration for multi-tier microservices" },
      { name: "Kubernetes", category: "Containers", tagline: "Deployments, Services, ConfigMaps, and cluster fundamentals" },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code & CI/CD",
    description: "Automating repeatable environments and continuous integration pipelines.",
    skills: [
      { name: "Terraform", category: "IaC", tagline: "Declarative resource provisioning and modular architecture", highlight: true },
      { name: "GitHub Actions", category: "CI/CD", tagline: "Automated test suites, build pipelines, and deployments", highlight: true },
      { name: "Git", category: "VCS", tagline: "Branching workflows, semantic releases, and code review" },
      { name: "Bash", category: "Scripting", tagline: "CLI automation, setup scripts, and environment configuration" },
    ],
  },
  {
    id: "os-networking",
    title: "Operating Systems & Networking",
    description: "Linux systems administration and internet transport protocols.",
    skills: [
      { name: "Linux", category: "Systems", tagline: "Process management, systemd, permissions, and debugging", highlight: true },
      { name: "Networking", category: "Networking", tagline: "TCP/IP, subnetting, CIDR notation, and routing" },
      { name: "DNS", category: "Networking", tagline: "Record types (A, CNAME, ALIAS), propagation, and resolvers" },
      { name: "HTTP / HTTPS", category: "Protocols", tagline: "TLS certificates, headers, status codes, and reverse proxies" },
    ],
  },
  {
    id: "observability",
    title: "Monitoring & Observability",
    description: "Capturing telemetry and operational insight into running workloads.",
    skills: [
      { name: "Prometheus", category: "Metrics", tagline: "Time-series metric scraping, exporters, and alerting concepts" },
      { name: "Grafana", category: "Dashboards", tagline: "Visualizing system metrics, CPU/memory saturation, and request rates" },
    ],
  },
];
