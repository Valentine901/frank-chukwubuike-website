import { useQueryContext } from "../../Context/GeneralQueryContext"
import SkillCard from "./SkillCard";

const Skills = () => {
    const { skills } = useQueryContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto lg:overflow-hidden transition-all duration-300 mt-2">
        {skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
    </div>
  )

}

export default Skills