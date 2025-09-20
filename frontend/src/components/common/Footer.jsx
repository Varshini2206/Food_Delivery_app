import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Team', path: '/team' },
      { label: 'Blog', path: '/blog' },
      { label: 'Press', path: '/press' },
    ],
    forPartners: [
      { label: 'Partner With Us', path: '/partner' },
      { label: 'Restaurant Partner', path: '/restaurant-partner' },
      { label: 'Delivery Partner', path: '/delivery-partner' },
      { label: 'Partner Support', path: '/partner-support' },
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQs', path: '/faq' },
      { label: 'Safety Guidelines', path: '/safety' },
      { label: 'Report an Issue', path: '/report' },
    ],
    legal: [
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Refund Policy', path: '/refund' },
      { label: 'Data Protection', path: '/data-protection' },
    ],
  };

  const socialLinks = [
    { icon: FacebookIcon, url: 'https://facebook.com/foodieexpress', label: 'Facebook' },
    { icon: TwitterIcon, url: 'https://twitter.com/foodieexpress', label: 'Twitter' },
    { icon: InstagramIcon, url: 'https://instagram.com/foodieexpress', label: 'Instagram' },
    { icon: LinkedInIcon, url: 'https://linkedin.com/company/foodieexpress', label: 'LinkedIn' },
    { icon: YouTubeIcon, url: 'https://youtube.com/foodieexpress', label: 'YouTube' },
  ];

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              FoodieExpress
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'grey.400' }}>
              Delivering happiness to your doorstep. Fresh, fast, and delicious food from your favorite restaurants.
            </Typography>
            
            {/* Contact Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 18, color: 'grey.400' }} />
              <Typography variant="body2" color="grey.400">
                support@foodieexpress.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 18, color: 'grey.400' }} />
              <Typography variant="body2" color="grey.400">
                1-800-FOODIE (366343)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationIcon sx={{ mr: 1, fontSize: 18, color: 'grey.400' }} />
              <Typography variant="body2" color="grey.400">
                Nationwide Delivery
              </Typography>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: 'grey.400',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Footer Links */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Company
                </Typography>
                {footerLinks.company.map((link, index) => (
                  <Link
                    key={index}
                    component="button"
                    onClick={() => handleLinkClick(link.path)}
                    sx={{
                      display: 'block',
                      color: 'grey.400',
                      textDecoration: 'none',
                      mb: 1,
                      textAlign: 'left',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  For Partners
                </Typography>
                {footerLinks.forPartners.map((link, index) => (
                  <Link
                    key={index}
                    component="button"
                    onClick={() => handleLinkClick(link.path)}
                    sx={{
                      display: 'block',
                      color: 'grey.400',
                      textDecoration: 'none',
                      mb: 1,
                      textAlign: 'left',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Support
                </Typography>
                {footerLinks.support.map((link, index) => (
                  <Link
                    key={index}
                    component="button"
                    onClick={() => handleLinkClick(link.path)}
                    sx={{
                      display: 'block',
                      color: 'grey.400',
                      textDecoration: 'none',
                      mb: 1,
                      textAlign: 'left',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Legal
                </Typography>
                {footerLinks.legal.map((link, index) => (
                  <Link
                    key={index}
                    component="button"
                    onClick={() => handleLinkClick(link.path)}
                    sx={{
                      display: 'block',
                      color: 'grey.400',
                      textDecoration: 'none',
                      mb: 1,
                      textAlign: 'left',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="grey.400">
            © {new Date().getFullYear()} FoodieExpress. All rights reserved.
          </Typography>
          
          <Typography variant="body2" color="grey.400">
            Made with ❤️ for food lovers everywhere
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;