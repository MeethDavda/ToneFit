import React from "react";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";

function ReviewResponse({ data }: object) {
  console.log(typeof data?.top_hex);
  return (
    <div className="flex  justify-center items-center">
      <div className="bg-[#fbf6f0] drop-shadow-xl rounded-lg min-h-[23em] max-w-[45em] h-auto flex flex-col p-5 gap-2">
        <div className="rounded-full text-center p-2 bg-green-700 opacity-70 w-[50%] mx-auto text-gray-100">
          {data ? data?.verdict : "Verdict"}
        </div>
        <div className="w-full text-center mt-2">
          <div>Score</div>
        </div>
        <div className="flex flex-row mt-1 gap-1 justify-around">
          <div>
            <div className="text-center">
              <div>Top</div>
            </div>
            <div
              className={` w-20 h-20 drop-shadow-lg rounded-lg mt-1`}
              style={{ backgroundColor: data?.top_hex ?? "#eee" }}
            ></div>
            <div className="text-sm text-center mt-2">{data?.top_hex}</div>
          </div>
          <AnimatedCircularProgressBar
            value={data ? data?.score * 100 : 0}
            gaugePrimaryColor={"#008236"}
            gaugeSecondaryColor={""}
            className="h-20 mt-4 opacity-90"
          />
          <div className="ml-2">
            <div className="text-center">
              <div>Bottom </div>
            </div>
            <div
              className={` w-20 h-20 drop-shadow-lg rounded-lg mt-1`}
              style={{ backgroundColor: data?.bottom_hex ?? "#eee" }}
            ></div>
            <div className="text-sm text-center mt-2">{data?.bottom_hex}</div>
          </div>
        </div>
        <div className="flex flex-col mt-4 w-[90%] mx-auto">
          <div className="text-center text-lg mb-1">Tips</div>
          <div>{data?.tips}</div>
        </div>
      </div>
    </div>
  );
}

export default ReviewResponse;
