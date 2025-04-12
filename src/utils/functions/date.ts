export const formatDate = (inputDate: Date): string => {
  const date = new Date(inputDate)

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
