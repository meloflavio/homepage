import Ffmpeg from 'fluent-ffmpeg';

export const removeSilence = async (filePath: string, outputPath: string) =>
  new Promise((resolve, reject) => {
    console.log('Removendo o silêncio do áudio...');

    // console.log(ffmpegPath)
    // ffmpeg.setFfmpegPath(ffmpegPath || '')
    Ffmpeg(filePath)
      .audioFilters(
        'silenceremove=stop_periods=-1:stop_duration=0.1:stop_threshold=-40dB'
      )
      .format('wav')
      .on('end', () => {
        console.log('Silêncio removido com sucesso!');
        resolve(outputPath); // Resolva com o caminho do arquivo de saída
      })
      .on('error', (error) => {
        console.log(`Erro ao remover o silêncio do áudio: ${error}`);
        reject(error);
      })
      .save(outputPath);
    return outputPath;
  });
