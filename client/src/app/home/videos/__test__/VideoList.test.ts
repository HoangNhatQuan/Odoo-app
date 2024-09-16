// import { render, screen } from '@testing-library/react'
// import { act } from 'react'
// import '@testing-library/jest-dom/extend-expect'

// import VideoList from '../index'
// import { IVideo } from '@/apis/video/video.type'

// // Define a simple mock for testing
// class IntersectionObserverMock {
//   readonly root: Element | null = null
//   readonly rootMargin: string = '0px'
//   readonly thresholds: ReadonlyArray<number> = []

//   // Simulate the callback and options properties the constructor receives
//   constructor(
//     public callback: IntersectionObserverCallback,
//     public options?: IntersectionObserverInit,
//   ) {}

//   // Mimic the method to simulate intersection changing
//   observe(target: Element): void {
//     // Trigger a fake intersection change
//     const entries: IntersectionObserverEntry[] = [
//       {
//         boundingClientRect: target.getBoundingClientRect(),
//         intersectionRatio: 1,
//         intersectionRect: target.getBoundingClientRect(),
//         isIntersecting: true,
//         rootBounds: this.root?.getBoundingClientRect() || null,
//         target,
//         time: Date.now(),
//       },
//     ]
//     this.callback(entries, this)
//   }

//   unobserve(target: Element): void {
//     // Optional for cleanup in tests
//   }

//   disconnect(): void {
//     // Optional for cleanup in tests
//   }

//   takeRecords(): IntersectionObserverEntry[] {
//     return [] // Implement based on testing needs
//   }
// }

// // In your test setup file or before unit tests:

// beforeEach(() => {
//   // Assign the mock to global.IntersectionObserver
//   global.IntersectionObserver = IntersectionObserverMock as any
// })

// afterEach(() => {
//   // Clean up after each test
//   jest.clearAllMocks()
// })

// describe('VideoList Component', () => {
//   const mockVideos: IVideo[] = [
//     {
//       _id: 'a9247103-1c5e-43fc-ae97-97ca2515ce7e',
//       videoYtbId: 'ab42tHfrP7c',
//       title:
//         'Bản tin: "Putin đang chơi cờ với Biden, còn chúng ta đang chơi cờ với chính mình"',
//       description:
//         'Bản tin 247: "Putin đang chơi cờ với Biden, còn chúng ta đang chơi cờ với chính mình"',
//       url: 'https://www.youtube.com/watch?v=ab42tHfrP7c',
//       thumbnail: 'https://i.ytimg.com/vi/ab42tHfrP7c/default.jpg',
//       referrer: {
//         id: '44288c37-85a1-4f49-8111-3ae3b9c83fb9',
//         name: 'quan',
//         email: 'quan@gmail.com',
//       },
//     },
//     {
//       _id: '651f7b82-9f60-4cc9-a494-73b7b130e1b6',
//       videoYtbId: 'cG_2ZSvaE0Y',
//       title:
//         'Uyên Ơi - Tình Yêu Của Em | Tập 1 | Phim Tình Cảm Việt Nam Hay Nhất 2021',
//       description:
//         'Uyên Ơi - Tình Yêu Của Em | Tập 1 | Phim Tình Cảm Việt Nam Hay Nhất 2021',
//       url: 'https://www.youtube.com/watch?v=ca22ZSvaE0Y',
//       thumbnail: 'https://i.ytimg.com/vi/ca22ZSvaE0Y/default.jpg',
//       createdAt: '2024-09-31T20:28:31.265Z',
//       updatedAt: '2024-09-31T20:28:31.265Z',
//       referrer: {
//         id: '52288c3s7-85a1-4f49-8111-3ae3b9c83fb9',
//         name: 'quan',
//         email: 'quan@gmail.com',
//       },
//     },
//   ]

//   it('video list', () => {
//     // act(() => {
//     //   render(
//     //     <VideoList
//     //       videos={mockVideos}
//     //       fetchNextPage={jest.fn()}
//     //       hasNextPage={false}
//     //       isFetchingNextPage={false}
//     //     />,
//     //   )
//     // })
//     // Check that the videos are rendered
//     // expect(
//     //   screen.getByText(
//     //     'Tại sao ngày 2/9/1945 - Bác Hồ nhất định phải đọc tuyên ngôn độc lập?',
//     //   ),
//     // ).toBeInTheDocument()
//     // expect(
//     //   screen.getByText(
//     //     '퇴근길 노래와 노을지는 도시 ✨ 저녁에 듣기좋은 잔잔한 감성 팝송 | Design making tutorial',
//     //   ),
//     // ).toBeInTheDocument()
//   })

//   it('fetchNextPage', () => {
//     const fetchNextPage = jest.fn()

//     act(() => {
//       // render(
//       //   <VideoList
//       //     videos={mockVideos}
//       //     fetchNextPage={fetchNextPage}
//       //     hasNextPage={true}
//       //     isFetchingNextPage={false}
//       //   />,
//       // )
//     })

//     // The observer should trigger fetchNextPage when the loader div is observed
//     expect(fetchNextPage).toHaveBeenCalledTimes(1)
//   })

//   it('does not call fetchNextPage if isFetchingNextPage is true', () => {
//     const fetchNextPage = jest.fn()

//     act(() => {
//       // render(
//       //   <VideoList
//       //     videos={mockVideos}
//       //     fetchNextPage={fetchNextPage}
//       //     hasNextPage={true}
//       //     isFetchingNextPage={true}
//       //   />,
//       // )
//     })

//     // The observer should not trigger fetchNextPage since isFetchingNextPage is true
//     expect(fetchNextPage).not.toHaveBeenCalled()
//   })

//   it('does not render the loader if hasNextPage is false', () => {
//     act(() => {
//       // render(
//       //   <VideoList
//       //     videos={mockVideos}
//       //     fetchNextPage={jest.fn()}
//       //     hasNextPage={false}
//       //     isFetchingNextPage={false}
//       //   />,
//       // )
//     })

//     // The loader div should not be rendered
//     // expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
//   })

//   it('hasNextPage', () => {
//     act(() => {
//       // render(
//       //   <VideoList
//       //     videos={mockVideos}
//       //     fetchNextPage={jest.fn()}
//       //     hasNextPage={true}
//       //     isFetchingNextPage={false}
//       //   />,
//       // )
//     })

//     // The loader div should be rendered
//     // expect(screen.getByText('Loading more...')).toBeInTheDocument()
//   })
// })
