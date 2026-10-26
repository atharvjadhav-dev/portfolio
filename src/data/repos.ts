export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
  isArchived: boolean;
}

export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: "route53-s3-cloudfront",
    fullName: "atharvjadhav-dev/route53-s3-cloudfront",
    description: "Automated AWS static website hosting with S3, CloudFront CDN, Route 53 DNS, and GitHub Actions CI/CD.",
    htmlUrl: "https://github.com/atharvjadhav-dev/route53-s3-cloudfront",
    language: "HTML",
    stars: 0,
    forks: 0,
    updatedAt: "2024-11-15T00:00:00Z",
    topics: ["aws", "s3", "cloudfront", "route53", "github-actions"],
    isArchived: false,
  },
  {
    id: 102,
    name: "terraform-modules",
    fullName: "atharvjadhav-dev/terraform-modules",
    description: "Reusable Terraform HCL modules for provisioning AWS VPCs, security groups, S3 backends, and compute instances.",
    htmlUrl: "https://github.com/atharvjadhav-dev/terraform-modules",
    language: "HCL",
    stars: 0,
    forks: 0,
    updatedAt: "2024-10-20T00:00:00Z",
    topics: ["terraform", "iac", "aws", "hcl", "infrastructure-automation"],
    isArchived: false,
  },
  {
    id: 103,
    name: "ecomm",
    fullName: "atharvjadhav-dev/ecomm",
    description: "Deploying a scalable e-commerce microservices architecture with multi-stage Docker builds and Docker Compose.",
    htmlUrl: "https://github.com/atharvjadhav-dev/ecomm",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updatedAt: "2024-12-01T00:00:00Z",
    topics: ["docker", "typescript", "microservices", "containers"],
    isArchived: false,
  },
  {
    id: 104,
    name: "document-vault",
    fullName: "atharvjadhav-dev/document-vault",
    description: "Secure document management platform deployed on AWS using S3 presigned URLs and KMS encryption.",
    htmlUrl: "https://github.com/atharvjadhav-dev/document-vault",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: "2024-09-10T00:00:00Z",
    topics: ["aws", "s3", "presigned-urls", "security"],
    isArchived: false,
  },
  {
    id: 105,
    name: "FormFlow",
    fullName: "atharvjadhav-dev/FormFlow",
    description: "A high-concurrency form builder engine designed to scale smoothly under heavy load.",
    htmlUrl: "https://github.com/atharvjadhav-dev/FormFlow",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updatedAt: "2024-08-05T00:00:00Z",
    topics: ["typescript", "react", "scalable-architecture"],
    isArchived: false,
  },
];
