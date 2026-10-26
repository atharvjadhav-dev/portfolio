export interface ProjectCaseStudy {
  problem: string;
  architecture: string[];
  techChoices: Array<{ technology: string; reason: string }>;
  implementation: string[];
  security: string[];
  challenges: Array<{ challenge: string; solution: string }>;
  lessonsLearned: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: "Cloud Infrastructure" | "Containers & Orchestration" | "Infrastructure as Code" | "Cloud Security & Storage";
  status: "Completed / Production" | "In Progress / Active" | "Planned / Architecture";
  featured: boolean;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  architectureDiagram?: string;
  keyHighlights: string[];
  caseStudy: ProjectCaseStudy;
}

export const projectsData: ProjectItem[] = [
  {
    id: "proj-01",
    slug: "aws-static-website-deployment",
    title: "AWS Static Website & Global CDN Architecture",
    shortDescription:
      "Production-grade static delivery pipeline using Amazon S3, CloudFront edge caching, Route 53 DNS routing, and automated GitHub Actions deployments.",
    category: "Cloud Infrastructure",
    status: "Completed / Production",
    featured: true,
    technologies: ["Amazon S3", "Amazon CloudFront", "Route 53", "GitHub Actions", "AWS IAM", "ACM (SSL/TLS)"],
    githubUrl: "https://github.com/atharvjadhav-dev/portfolio",
    liveUrl: "https://atharvjadhav.xyz",
    keyHighlights: [
      "Origin Access Control (OAC) enforcing 100% private S3 buckets",
      "Automated S3 synchronization and CloudFront cache invalidation on push",
      "Custom domain routing with Amazon Route 53 alias records",
      "HTTPS enforcement via AWS Certificate Manager (ACM)",
    ],
    caseStudy: {
      problem:
        "Standard static hosting directly out of public S3 buckets introduces security risks, lacks global low-latency distribution, and does not support modern HTTPS or custom apex domain routing natively without additional CDN configuration.",
      architecture: [
        "Client requests originate globally and hit the nearest Amazon CloudFront Point of Presence (PoP) via Route 53 ALIAS records.",
        "CloudFront enforces HTTPS redirection and terminates SSL using certificates issued by AWS Certificate Manager (ACM).",
        "If a cache miss occurs, CloudFront signs the request with Origin Access Control (OAC) to retrieve objects from the private S3 bucket.",
        "The Amazon S3 bucket policy strictly rejects any unauthenticated or direct public requests, allowing reads only from the designated CloudFront distribution principal.",
        "GitHub Actions CI/CD pipeline triggers on commits to the main branch, builds assets, syncs files to S3, and triggers a CloudFront invalidation for /*.",
      ],
      techChoices: [
        {
          technology: "Amazon S3",
          reason: "Provides virtually unlimited object durability (99.999999999%) and zero compute maintenance overhead for static assets.",
        },
        {
          technology: "Amazon CloudFront",
          reason: "Enables sub-50ms latency across global edge locations, gzip/brotli compression, and provides DDoS mitigation with AWS Shield standard.",
        },
        {
          technology: "Origin Access Control (OAC)",
          reason: "Replaces legacy OAI to support modern AWS authentication signatures (SigV4) and bucket encryption with KMS.",
        },
        {
          technology: "GitHub Actions",
          reason: "Provides lightweight, declarative automation without requiring self-hosted Jenkins agents.",
        },
      ],
      implementation: [
        "Configured private S3 bucket with versioning enabled and default AES-256 server-side encryption.",
        "Generated CloudFront distribution with Price Class 100, custom error responses for Single Page App (SPA) fallback, and HTTP-to-HTTPS redirect.",
        "Configured Route 53 hosted zone with IPv4 (A) and IPv6 (AAAA) Alias records pointing to CloudFront distribution.",
        "Authored GitHub Actions workflow using aws-actions/configure-aws-credentials with least-privilege IAM deployment user.",
      ],
      security: [
        "Zero public read permissions on the S3 bucket; Block Public Access (BPA) strictly set to true across all 4 settings.",
        "IAM deployment role scoped strictly to s3:PutObject, s3:DeleteObject, and cloudfront:CreateInvalidation.",
        "HSTS and TLS v1.2 minimum protocol version enforced on CloudFront distribution.",
      ],
      challenges: [
        {
          challenge: "Stale CDN cache serving old bundles after new code deployments.",
          solution:
            "Added an automated `aws cloudfront create-invalidation --distribution-id $DIST_ID --paths '/*'` step at the end of the CI pipeline.",
        },
        {
          challenge: "Handling SPA route reloads returning 403/404 from S3.",
          solution:
            "Implemented CloudFront Custom Error Response mappings redirecting 403 and 404 status codes to /index.html with a 200 response code.",
        },
      ],
      lessonsLearned: [
        "Always use Origin Access Control (OAC) rather than legacy OAI for new deployments.",
        "Keep TTLs low during initial DNS propagation in Route 53 to allow swift rollback if necessary.",
        "Automating cache invalidation is essential for deterministic deployments.",
      ],
    },
  },
  {
    id: "proj-02",
    slug: "reusable-terraform-infrastructure-modules",
    title: "Modular AWS Infrastructure as Code (Terraform)",
    shortDescription:
      "Reusable, parameterized Terraform HCL modules for provisioning reproducible AWS environments with remote state locking, least-privilege IAM, and cost-aware teardown routines.",
    category: "Infrastructure as Code",
    status: "Completed / Production",
    featured: true,
    technologies: ["Terraform (HCL)", "AWS Provider", "Amazon S3 Backend", "DynamoDB State Locking", "GitHub Actions"],
    githubUrl: "https://github.com/atharvjadhav-dev/terraform-modules",
    keyHighlights: [
      "Modular components for VPC, subnets, S3/CloudFront, and compute security groups",
      "Remote state storage in S3 with DynamoDB distributed state locking",
      "Strict input variable validation and typed outputs",
      "Clean separation of environments (dev/stage/prod) via directory structures",
    ],
    caseStudy: {
      problem:
        "Manual cloud provisioning via the AWS Management Console leads to configuration drift, lack of auditability, human error, and lingering orphaned resources that drive unexpected cloud bills.",
      architecture: [
        "Root modules consume versioned submodules (networking, security, static-hosting, compute).",
        "Terraform backend executes remote state operations with server-side encrypted S3 and atomic state locking via DynamoDB LockID table.",
        "Environment configurations (dev/prod) supply distinct tfvars files defining resource sizing, retention policies, and instance counts.",
      ],
      techChoices: [
        {
          technology: "Terraform (HCL)",
          reason: "Industry-standard declarative syntax with robust state management and broad AWS ecosystem support.",
        },
        {
          technology: "S3 + DynamoDB State Backend",
          reason: "Guarantees safe team collaboration without concurrent state corruption or merge conflicts.",
        },
        {
          technology: "Modular Composition",
          reason: "Enables DRY (Don't Repeat Yourself) definitions so infrastructure patterns can be instantiated repeatedly.",
        },
      ],
      implementation: [
        "Structured modules into root `modules/` directory with clean `main.tf`, `variables.tf`, and `outputs.tf` in each unit.",
        "Implemented strict variable validations (e.g., regex constraints for environment names and CIDR block formats).",
        "Configured standardized tagging schemas (Environment, ManagedBy, Project, Owner) across all provisioned resources for automated cost tracking.",
      ],
      security: [
        "Sensitive outputs marked as `sensitive = true` to prevent secrets exposure in CLI logs.",
        ".gitignore rules to avoid committing `.tfstate`, `.terraform/`, and local `.tfvars` containing secrets.",
        "State bucket configured with S3 Versioning, Object Lock, and KMS encryption to prevent accidental state destruction.",
      ],
      challenges: [
        {
          challenge: "Accidental state race conditions when multiple runs trigger simultaneously.",
          solution: "Enforced DynamoDB table state locking with `LockID` primary key attribute.",
        },
        {
          challenge: "Resource destruction dependencies causing circular reference errors during teardown.",
          solution: "Established explicit `depends_on` clauses between security group ingress rules and subnet route associations.",
        },
      ],
      lessonsLearned: [
        "Infrastructure code requires the same rigorous linting and validation (`terraform fmt -check`, `terraform validate`) as application code.",
        "Consistent resource tagging from day one is critical for understanding AWS billing allocation.",
      ],
    },
  },
  {
    id: "proj-03",
    slug: "containerized-microservices-deployment",
    title: "Containerized Multi-Tier Web Application Stack",
    shortDescription:
      "Containerized microservice architecture using multi-stage Docker builds, Docker Compose orchestration, PostgreSQL persistent storage, Redis caching, and health probes.",
    category: "Containers & Orchestration",
    status: "Completed / Production",
    featured: true,
    technologies: ["Docker", "Docker Compose", "Node.js / TypeScript", "PostgreSQL", "Redis", "Nginx Reverse Proxy"],
    githubUrl: "https://github.com/atharvjadhav-dev/ecomm",
    keyHighlights: [
      "Multi-stage Dockerfile slashing production image footprint by over 65%",
      "Isolated bridge networks separating public traffic from database layers",
      "Persistent Docker named volumes ensuring zero data loss across container restarts",
      "Configured container healthchecks with automated dependency boot order",
    ],
    caseStudy: {
      problem:
        "Monolithic application deployments suffered from host dependency inconsistencies ('works on my machine'), heavy runtime bloat, and manual service wiring between API servers, databases, and caches.",
      architecture: [
        "Nginx reverse proxy container exposes public port 80/443 and routes API traffic to upstream application containers.",
        "Node.js application running in a non-root Alpine container communicates across internal container network.",
        "PostgreSQL 16 relational database runs in a private network partition with volume mounts for data persistence.",
        "Redis container handles session tokens and volatile caching with memory limits.",
      ],
      techChoices: [
        {
          technology: "Docker Multi-stage Builds",
          reason: "Separates devDependencies/build toolchains from lean production runtimes, drastically minimizing security attack surface.",
        },
        {
          technology: "Docker Compose",
          reason: "Declarative multi-container specification suitable for predictable local staging and reproducible integration tests.",
        },
        {
          technology: "Alpine Linux Base",
          reason: "Minimizes container footprint down to ~120MB compared to standard 1GB+ Node images.",
        },
      ],
      implementation: [
        "Crafted 3-stage Dockerfile: `deps` -> `builder` -> `runner`.",
        "Set up explicit container healthcheck definitions using `curl` or `pg_isready` before starting downstream dependents (`depends_on: { condition: service_healthy }`).",
        "Configured environment variable injection using `.env` templates without committing secrets.",
      ],
      security: [
        "Ran process as non-root `USER node` (UID 1000) inside the container.",
        "Database port 5432 bound only to internal Docker bridge network; not exposed to host interfaces.",
        "Read-only root filesystem flags enabled where appropriate.",
      ],
      challenges: [
        {
          challenge: "Application container attempting to execute queries before PostgreSQL completed initial socket startup.",
          solution:
            "Configured Docker Compose `healthcheck` on PostgreSQL using `pg_isready` paired with `depends_on: condition: service_healthy` on the API service.",
        },
        {
          challenge: "Large image size slowing down container pulls and CI/CD runs.",
          solution: "Employed multi-stage builds and pruned cache directories in the same layer to eliminate intermediate build artifacts.",
        },
      ],
      lessonsLearned: [
        "Never run containers as root in production.",
        "Health checks are mandatory for microservices to prevent cascading connection failures.",
      ],
    },
  },
  {
    id: "proj-04",
    slug: "document-vault-aws-cloud-security",
    title: "Document Vault — Secure Cloud Storage on AWS",
    shortDescription:
      "Secure document management platform deployed on AWS featuring IAM role-based authorization, S3 pre-signed URL uploads, and encrypted cloud storage.",
    category: "Cloud Security & Storage",
    status: "Completed / Production",
    featured: false,
    technologies: ["AWS S3", "AWS IAM", "Node.js / Express", "S3 Pre-signed URLs", "AWS SDK v3", "KMS Encryption"],
    githubUrl: "https://github.com/atharvjadhav-dev/document-vault",
    keyHighlights: [
      "Direct-to-S3 uploads via short-lived pre-signed URLs bypassing backend bottlenecks",
      "Server-side encryption using AWS Key Management Service (AWS KMS)",
      "Strict IAM policies preventing direct public access to sensitive documents",
      "Time-limited download links with automated token expiration",
    ],
    caseStudy: {
      problem:
        "Uploading large confidential documents through an intermediate application server exhausts server memory, wastes bandwidth, and introduces potential storage security vulnerabilities if local files are retained.",
      architecture: [
        "Client authenticates with application API and requests an upload ticket.",
        "Backend verifies user permissions and uses AWS SDK v3 to generate a short-lived (15-minute) pre-signed PUT URL with specific Content-Type and size constraints.",
        "Client uploads directly to the private S3 bucket using the pre-signed URL.",
        "Downloads use temporary signed GET URLs, ensuring documents are never publicly readable.",
      ],
      techChoices: [
        {
          technology: "S3 Pre-signed URLs",
          reason: "Offloads multi-gigabyte upload traffic directly to AWS S3 infrastructure, preserving application server memory.",
        },
        {
          technology: "AWS KMS",
          reason: "Enables customer-managed encryption keys with audit trails via AWS CloudTrail.",
        },
      ],
      implementation: [
        "Implemented `@aws-sdk/s3-request-presigner` for cryptographic signature generation.",
        "Configured CORS rules on the S3 bucket to allow authorized origin origins only.",
        "Enforced S3 bucket lifecycle rules to transition stale temporary files to Glacier after 90 days.",
      ],
      security: [
        "Pre-signed URLs restricted to 900 seconds maximum lifespan.",
        "Enforced content-length range headers to prevent denial-of-wallet storage exhaustion attacks.",
        "Full encryption at rest using SSE-KMS.",
      ],
      challenges: [
        {
          challenge: "CORS preflight failures during direct browser PUT requests to Amazon S3.",
          solution:
            "Configured explicit S3 CORS XML rules allowing `PUT` and `GET` from verified client origins with `ETag` and `Authorization` headers.",
        },
      ],
      lessonsLearned: [
        "Pre-signed URLs are the gold standard for secure file transfer architectures in the cloud.",
        "Least-privilege IAM policies must be verified with AWS IAM Policy Simulator before production release.",
      ],
    },
  },
];
