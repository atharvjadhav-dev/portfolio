export interface ProfileData {
  name: string;
  terminalUser: string;
  terminalHost: string;
  role: string;
  eyebrow: string;
  headline: string;
  bio: string;
  detailedBio: string[];
  availability: {
    isOpen: boolean;
    label: string;
    description: string;
  };
  workflow: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  learningGoals: Array<{
    title: string;
    focus: string;
    status: "in-progress" | "planned";
  }>;
}

export const profileData: ProfileData = {
  name: "Atharv Jadhav",
  terminalUser: "atharv",
  terminalHost: "cloud-lab",
  role: "Cloud & DevOps Engineer",
  eyebrow: "CLOUD COMPUTING · DEVOPS ENGINEERING",
  headline: "Building reliable systems. Automating everything else.",
  bio: "I'm Atharv Jadhav, a computer science graduate focused on cloud infrastructure, containerization, CI/CD, and automation.",
  detailedBio: [
    "I'm a computer science graduate building practical skills in cloud computing and DevOps. My focus is understanding how applications are packaged, deployed, secured, automated, and monitored in real environments.",
    "Rather than treating deployment as an afterthought, I approach infrastructure as software: version-controlled, automated through declarative code, and validated before touching production.",
  ],
  availability: {
    isOpen: true,
    label: "Open to relevant opportunities",
    description: "Available for entry-level and junior Cloud/DevOps Engineer positions, site reliability roles, and infrastructure internships.",
  },
  workflow: [
    {
      step: "01",
      title: "Plan",
      description: "Define architecture requirements, isolation boundaries, and security policies.",
    },
    {
      step: "02",
      title: "Build",
      description: "Package application components using optimized multi-stage container builds.",
    },
    {
      step: "03",
      title: "Automate",
      description: "Implement GitHub Actions pipelines for linting, security scanning, and builds.",
    },
    {
      step: "04",
      title: "Deploy",
      description: "Provision reproducible cloud resources with Terraform and edge routing.",
    },
    {
      step: "05",
      title: "Monitor",
      description: "Instrument systems with health probes, logging, and performance telemetry.",
    },
    {
      step: "06",
      title: "Improve",
      description: "Analyze latency, review cost drivers, and refine reliability patterns.",
    },
  ],
  learningGoals: [
    {
      title: "Advanced Kubernetes & CKA Competencies",
      focus: "Custom Resource Definitions, ingress controllers, network policies, and pod disruption budgets.",
      status: "in-progress",
    },
    {
      title: "AWS Certified Solutions Architect Associate",
      focus: "Multi-region disaster recovery, VPC peering, transit gateways, and IAM policy permission boundaries.",
      status: "in-progress",
    },
    {
      title: "GitOps Workflows with ArgoCD",
      focus: "Continuous reconciliation loops, progressive delivery, and automated rollback strategies.",
      status: "planned",
    },
  ],
};
