import Config from "config";
import { fetchJson } from "./fetchJson";

describe("fetchData", () => {
  describe("Url construction", () => {
    beforeEach(() => fetchMock.mockResponseOnce("{}"));

    it("Fetches a simple Driveay url", () => {
      fetchJson({ url: "some-path" });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining(
          Config.apiBase + "some-path?key=" + Config.backendApiKey,
        ),
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("Serializes param-as-kv-pairs into the query-string", () => {
      fetchJson({
        url: "some-path",
        params: { color: "green" },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("color=green"),
        expect.anything(),
      );
    });

    it("Incorporates params-as-string into the query-string", () => {
      fetchJson({
        url: "some-path",
        params: "favorite-food=pizza",
      });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("?favorite-food=pizza&key="),
        expect.anything(),
      );
    });

    it("Does not override a 'key' property from options.params", () => {
      fetchJson({
        url: "some-path",
        params: { key: "mykey" },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("key=mykey"),
        expect.anything(),
      );
      expect(fetchMock).toHaveBeenCalledWith(
        expect.not.stringContaining(`key=${Config.backendApiKey}`),
        expect.anything(),
      );
    });
  });

  describe("Headers", () => {
    beforeEach(() => fetchMock.mockResponseOnce("{}"));

    it("Includes an authorization header if a token is passed via the context prop", () => {
      fetchJson({
        url: "some-path",
        context: {
          meta: { accessToken: "Open-Sez-Me!" },
          queryKey: ["any-key"],
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("some-path"),
        expect.objectContaining({
          headers: expect.objectContaining({
            authorization: "Bearer Open-Sez-Me!",
          }),
        }),
      );
    });

    it("Does not allow overriding JSON headers", () => {
      fetchJson({
        url: "some-path",
        headers: {
          Accept: "image/*",
          "Content-Type": "text/plain",
        },
      });
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("some-path"),
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        }),
      );
    });
  });

  describe("Response error handling", () => {
    beforeEach(() => {
      fetchMock.mockResponseOnce("{}", {
        status: 300,
      });
    });

    it("By default, throws an error if the status returned is 300+", () => {
      expect(fetchJson({ url: "some-path" })).rejects.toThrow(
        "Didn't receive a valid response. Status: 300",
      );
    });

    it("Does not throw an error for 300+ responses if validateStatus returns true", () => {
      expect(() =>
        fetchJson({
          url: "some-path",
          validateStatus: (_status: number) => true,
        }),
      ).not.toThrow();
    });
  });

  describe("Response success handling", () => {
    it("Returns promise that resolves with json parsed from the response", async () => {
      fetchMock.mockResponseOnce(`{ "hello": "world!" }`);

      const { hello } = await fetchJson<{ hello: string }>({
        url: "some-path",
      });

      expect(hello).toBe("world!");
    });
  });
});
