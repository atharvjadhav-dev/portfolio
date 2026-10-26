export interface SocialLink {
  name: string;
  url: string;
  label: string;
  icon: string;
  isExternal?: boolean;
}

export const socialsData: {
  github: SocialLink;
  linkedin: SocialLink;
  email: SocialLink;
  resume: {
    url: string;
    filename: string;
    label: string;
  };
} = {
  github: {
    name: "GitHub",
    url: "https://github.com/atharvjadhav-dev",
    label: "github.com/atharvjadhav-dev",
    icon: "github",
    isExternal: true,
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://linkedin.com/in/atharv-jadhav",
    label: "linkedin.com/in/atharv-jadhav",
    icon: "linkedin",
    isExternal: true,
  },
  email: {
    name: "Email",
    url: "mailto:atharvjadhav.dev@gmail.com",
    label: "atharvjadhav.dev@gmail.com",
    icon: "mail",
    isExternal: false,
  },
  resume: {
    url: "/resume.pdf",
    filename: "Atharv_Jadhav_DevOps_Resume.pdf",
    label: "Download Resume",
  },
};
