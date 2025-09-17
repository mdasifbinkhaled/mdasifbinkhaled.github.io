import { act, renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { __TOAST_TEST_UTILS, useToast } from "@/hooks/use-toast"

describe("useToast", () => {
  if (!__TOAST_TEST_UTILS) {
    throw new Error("__TOAST_TEST_UTILS is not available outside of test environment")
  }

  beforeEach(() => {
    __TOAST_TEST_UTILS.reset()
  })

  it("registers a single listener and cleans up on unmount", async () => {
    const { unmount } = renderHook(() => useToast())

    await waitFor(() => expect(__TOAST_TEST_UTILS.getListenerCount()).toBe(1))

    unmount()

    await waitFor(() => expect(__TOAST_TEST_UTILS.getListenerCount()).toBe(0))
  })

  it("updates state when dispatching toasts without duplicating listeners", async () => {
    const { result } = renderHook(() => useToast())

    await waitFor(() => expect(__TOAST_TEST_UTILS.getListenerCount()).toBe(1))
    expect(result.current.toasts).toHaveLength(0)

    act(() => {
      result.current.toast({
        description: "First toast",
        title: "Toast #1",
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]?.description).toBe("First toast")
    expect(__TOAST_TEST_UTILS.getListenerCount()).toBe(1)

    act(() => {
      result.current.toast({
        description: "Second toast",
        title: "Toast #2",
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]?.description).toBe("Second toast")
    expect(__TOAST_TEST_UTILS.getListenerCount()).toBe(1)
  })
})
