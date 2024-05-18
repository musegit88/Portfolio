import { CgWebsite } from "react-icons/cg";
import { projects } from "@/lib/constants";
import Image from "next/image";

const Projects = () => {
  return (
    <section className="flex flex-col gap-y-4 mt-28">
      <div>
        <div className="flex items-center gap-4">
          <h5 className="text-xl font-medium">Projects</h5>
          <CgWebsite size={20} />
        </div>
        <p
          className="text-xs md:text-sm text-gray-500 dark:text-white
        "
        >
          Selectd projects
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id}>
            <div className="relative w-full h-60 overflow-hidden rounded shadow-md border">
              <Image
                src={project.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={project.label}
                className="object-cover object-center w-full h-full"
              />
              <div className="absolute w-full h-full  bg-gradient-to-t from-black via-black/20 " />
              <div className="absolute flex flex-col justify-end h-full p-4 text-white">
                <div className="text-white mb-2 flex items-center gap-2 w-full">
                  <span title={project.label} className="line-clamp-1">
                    {project.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.tech.map((item, index) => (
                      <span
                        key={index}
                        className="text-xs text-black bg-white px-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm">{project.description}</p>
                <a href={project.href} className="text-xs">
                  {project.href}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
