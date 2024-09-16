// import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
// import { act } from 'react-dom/test-utils'
// import VideoCard from '../card'

// const mockVideo = {
//   id: '1',
//   title: 'Test Video',
//   videoYtbId: 'aTw4w9WgXcQ',
//   title:
//     'Bản tin: "Putin đang chơi cờ với Biden, còn chúng ta đang chơi cờ với chính mình"',
//   description:
//     'Bản tin 247: "Putin đang chơi cờ với Biden, còn chúng ta đang chơi cờ với chính mình"',

//   createdAt: '2024-08-01T03:45:50.077Z',
//   updatedAt: '2024-08-01T03:45:50.077Z',
//   referrer: {
//     id: '52288c3s7-85a1-4f49-8111-3ae3b9c83fb9',
//     name: 'quan',
//     email: 'quan@gmail.com',
//   },
// }

// describe('VideoCard', () => {
//   it('renders', () => {
//     act(() => {
//       // render(<VideoCard video={mockVideo} />)
//     })

//     // Check if the iframe is rendered
//     const iframe = screen.getByTitle(mockVideo.title)
//     // expect(iframe).toBeInTheDocument()
//     // expect(iframe).toHaveAttribute(
//     //   'src',
//     //   `https://www.youtube.com/embed/${mockVideo.videoYtbId}`,)

//     const nameDisplay = screen.getByText(
//       `Shared by: ${mockVideo.referrer.name}`,
//     )
//     // expect(nameDisplay).toBeInTheDocument()
//   })
// })
