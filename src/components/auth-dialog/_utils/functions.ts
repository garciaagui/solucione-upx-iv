import { RegisterFormValues } from '.'

export const requestRegister = async (data: RegisterFormValues) => {
  const { name, email, password } = data

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao cadastrar usuário')
  }

  return response.json()
}
