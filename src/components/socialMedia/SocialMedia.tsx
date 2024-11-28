import RedditIcon from "@mui/icons-material/Reddit";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, IconButton } from "@mui/material";

export interface ISocialMediaProps {
  color: string;
  border: string;
}

export function SocialMedia(props: ISocialMediaProps) {
  const SocialIcon = (icon: React.ReactNode, link: string) => {
    return (
      <IconButton
        onClick={() => window.open(link, "_blank")}
        sx={{
          border: props.border,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {icon}
      </IconButton>
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      {SocialIcon(<RedditIcon sx={{ color: props.color }} />, "https://www.reddit.com/user/Flymile")}
      {SocialIcon(<InstagramIcon sx={{ color: props.color }} />, "https://www.instagram.com/flymile.pro")}
      {SocialIcon(<LinkedInIcon sx={{ color: props.color }} />, "https://linkedin.com/company/flymile")}
    </Box>
  );
}
