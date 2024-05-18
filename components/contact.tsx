import { contacts } from "@/lib/constants";
import { MdOutlineContactMail } from "react-icons/md";
import { IconType } from "react-icons/lib";

const Contact = () => {
  return (
    <section className="mt-28">
      <div className="flex items-center gap-4">
        <h5 className="text-xl font-medium">Contact</h5>
        <MdOutlineContactMail size={20} />
      </div>
      <p className="text-xs md:text-sm text-gray-500 dark:text-white">
        Let&apos;s build something amazing together. Get in touch.
      </p>
      <div className="flex gap-4 mt-6">
        {contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} />
        ))}
      </div>
    </section>
  );
};

export default Contact;

interface ContactCardProps {
  contact: {
    href?: string;
    icon: IconType;
    isMail: boolean;
    mail?: string;
  };
}

const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <a
      href={contact.isMail ? `mailto:${contact.mail}` : contact.href}
      target="_blank"
      className="border p-2 rounded-md transition duration-200 shadow-md"
    >
      <contact.icon size={40} className="" />
    </a>
  );
};
