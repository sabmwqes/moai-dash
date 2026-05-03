import type { Skill } from '../../../types/game'

type Props = {
  skills: Skill[]
  currentMp: number
  onUseSkill: (id: string) => void
}

export function SkillPanel({ skills, currentMp, onUseSkill }: Props) {
  return (
    <div className="battle-panel battle-panel--skills">
      {skills.length === 0 && (
        <span style={{ opacity: 0.4, fontStyle: 'italic' }}>No skills</span>
      )}
      {skills.map((skill) => (
        <button
          key={skill.id}
          type="button"
          className="pairing-btn"
          disabled={currentMp < skill.mpCost}
          onClick={() => onUseSkill(skill.id)}
          title={skill.description}
        >
          {skill.icon} {skill.name} ({skill.mpCost}MP)
        </button>
      ))}
    </div>
  )
}
