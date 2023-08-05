const MiddleBanner = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-48 min-h-full border border-solid border-black border-1 px-5 py-5 mb-5">
      <p>image</p>
      <p className="whitespace-pre-line text-center">{`ユーティリティ説明(３つほど)\nバナーのようなイメージ`}</p>
    </div>
  );
};

export default MiddleBanner;
