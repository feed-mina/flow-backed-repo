#!/bin/bash

# 저장할 디렉토리 생성
mkdir -p test_files

# 확장자 리스트
EXTENSIONS=("exe" "sh" "bat" "txt" "jpg" "zip" "docx" "pdf")

# 각 확장자마다 10개씩 생성
for EXT in "${EXTENSIONS[@]}"; do
  for i in {1..10}; do
    FILENAME="test_files/testfile_${EXT}_${i}.${EXT}"
    echo "Dummy content for ${FILENAME}" > "$FILENAME"
  done
done

echo "✅ 테스트용 파일이 test_files/ 폴더에 생성되었습니다."
