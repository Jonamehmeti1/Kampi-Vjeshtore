import { camp, footer } from "../content/camp";
import Icon, { type IconName } from "./Icon";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner" data-reveal>
        <div className="footer-brand">
          <img
            src={camp.footerLogo}
            alt={camp.organizer}
            className="footer-logo"
            width={1476}
            height={768}
            loading="lazy"
          />
          <p className="footer-tagline">{footer.tagline}</p>
        </div>

        <div className="footer-social">
          {footer.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className={"footer-social-" + link.icon}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              <Icon name={link.icon as IconName} />
            </a>
          ))}
        </div>

        <div className="footer-contact">
          <a href={"mailto:" + footer.email}>{footer.email}</a>
          <a href={"tel:" + footer.phoneLink}>{footer.phone}</a>
        </div>
      </div>
    </footer>
  );
}
