import { useMemo } from 'react'

const PwdStrength = ({ pwd }: { pwd: string }) => {
  const strength = useMemo(() => {
    let strength = 0
    let hasUpperCase = /[A-Z]/.test(pwd)
    let hasLowerCase = /[a-z]/.test(pwd)
    let hasNumbers = /\d/.test(pwd)
    let hasSymbols = /[^\w\s]/.test(pwd)

    if (pwd.length < 6) return strength

    // Assess strength based on the number of different factors in the password.
    if (hasUpperCase) strength++
    if (hasLowerCase) strength++
    if (hasNumbers) strength++
    if (hasSymbols) strength++

    // Assess strength based on password length.
    if (pwd.length >= 8) strength++

    // Assess strength based on the complexity of the password.
    if (hasUpperCase && hasLowerCase && hasNumbers && hasSymbols) {
      strength++
    }
    return strength
  }, [pwd])

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        <progress
          max={100}
          value={!!pwd ? 100 : 0}
          className="progress bg-[#a4b7c654] progress-error"
          style={{ marginBottom: 0 }}
        />
        <progress
          max={100}
          value={strength > 2 ? 100 : 0}
          className="progress bg-[#a4b7c654] progress-info"
          style={{ marginBottom: 0 }}
        />
        <progress
          max={100}
          value={strength > 4 ? 100 : 0}
          className="progress bg-[#a4b7c654] progress-success"
          style={{ marginBottom: 0 }}
        />
      </div>
      <p>Recommend from 8 characters, 1 uppercase, 1 number and 1 symbol</p>
    </div>
  )
}

export default PwdStrength
