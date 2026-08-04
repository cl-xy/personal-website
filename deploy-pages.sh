#!/bin/bash
set -e

# Build all three versions into a combined gh-pages deploy
# Each version gets its own subfolder: /agent-trace/, /fieldbook/, /incident-report/

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="/tmp/gh-pages-build"
CURRENT_BRANCH=$(git branch --show-current)

rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Function to build a branch into a subfolder

build_branch() {
  local BRANCH="$1"
  local SUBFOLDER="$2"

  echo ""
  echo "=========================================="
  echo "Building $BRANCH -> /$SUBFOLDER/"
  echo "=========================================="

  REPO_NAME="personal-website"

  if [ "$BRANCH" = "$CURRENT_BRANCH" ]; then
    # Build in place, swap config temporarily
    cd "$REPO_DIR"
    cp next.config.mjs next.config.mjs.bak

    cat > next.config.mjs << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/$REPO_NAME/$SUBFOLDER',
  assetPrefix: '/$REPO_NAME/$SUBFOLDER/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
EOF

    npm run build

    # Post-process: rewrite absolute asset paths for GitHub Pages subpath
    find out -type f \( -name "*.js" -o -name "*.html" \) -exec sed -i '' \
      -e "s|\"\/gallery\/|\"/$REPO_NAME/$SUBFOLDER/gallery/|g" \
      -e "s|\"\/cover\.|\"/$REPO_NAME/$SUBFOLDER/cover.|g" \
      -e "s|\"\/bank_app\.|\"/$REPO_NAME/$SUBFOLDER/bank_app.|g" \
      -e "s|\"\/portfolio_decarbonization\.|\"/$REPO_NAME/$SUBFOLDER/portfolio_decarbonization.|g" \
      -e "s|\"\/logos\/|\"/$REPO_NAME/$SUBFOLDER/logos/|g" \
      -e "s|href=\"/favicon|href=\"/$REPO_NAME/$SUBFOLDER/favicon|g" \
      {} \;

    cp -r out "$BUILD_DIR/$SUBFOLDER"
    mv next.config.mjs.bak next.config.mjs
    rm -rf out
  else
    # Use worktree for other branches
    WORKTREE="/tmp/pages-worktree-$SUBFOLDER"
    rm -rf "$WORKTREE"
    git worktree add "$WORKTREE" "$BRANCH"

    cd "$WORKTREE"
    npm install

    cat > next.config.mjs << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/$REPO_NAME/$SUBFOLDER',
  assetPrefix: '/$REPO_NAME/$SUBFOLDER/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
EOF

    npm run build

    # Post-process: rewrite absolute asset paths for GitHub Pages subpath
    find out -type f \( -name "*.js" -o -name "*.html" \) -exec sed -i '' \
      -e "s|\"\/gallery\/|\"/$REPO_NAME/$SUBFOLDER/gallery/|g" \
      -e "s|\"\/cover\.|\"/$REPO_NAME/$SUBFOLDER/cover.|g" \
      -e "s|\"\/bank_app\.|\"/$REPO_NAME/$SUBFOLDER/bank_app.|g" \
      -e "s|\"\/portfolio_decarbonization\.|\"/$REPO_NAME/$SUBFOLDER/portfolio_decarbonization.|g" \
      -e "s|\"\/logos\/|\"/$REPO_NAME/$SUBFOLDER/logos/|g" \
      -e "s|href=\"/favicon|href=\"/$REPO_NAME/$SUBFOLDER/favicon|g" \
      {} \;

    cp -r out "$BUILD_DIR/$SUBFOLDER"

    cd "$REPO_DIR"
    git worktree remove "$WORKTREE" --force
  fi
}

build_branch "master" "agent-trace"
build_branch "v2-fieldbook-failures" "fieldbook"
build_branch "v3-incident-report" "incident-report"

# Create index page
cat > "$BUILD_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Versions</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0d1117; color: #e6edf3; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .container { max-width: 600px; padding: 2rem; }
    h1 { font-size: 1.5rem; margin-bottom: 1.5rem; font-weight: 500; }
    .versions { display: flex; flex-direction: column; gap: 1rem; }
    a { display: block; padding: 1.25rem; border: 1px solid #30363d; border-radius: 8px; color: #58a6ff; text-decoration: none; transition: border-color 0.15s; }
    a:hover { border-color: #58a6ff; }
    .label { font-size: 1.1rem; font-weight: 500; }
    .desc { color: #8b949e; font-size: 0.875rem; margin-top: 0.25rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Portfolio Versions</h1>
    <div class="versions">
      <a href="./agent-trace/">
        <div class="label">Agent Trace</div>
        <div class="desc">Dark terminal aesthetic. The portfolio IS a running AI agent analyzing the candidate.</div>
      </a>
      <a href="./fieldbook/">
        <div class="label">Fieldbook</div>
        <div class="desc">Warm editorial style, serif typography, margin annotations, field notes framing.</div>
      </a>
      <a href="./incident-report/">
        <div class="label">Incident Report</div>
        <div class="desc">Failure-first structure, amber/teal incident blocks, utilitarian feel.</div>
      </a>
    </div>
  </div>
</body>
</html>
EOF

# Add .nojekyll to prevent GitHub from processing with Jekyll
touch "$BUILD_DIR/.nojekyll"

echo ""
echo "=========================================="
echo "All builds complete! Output in: $BUILD_DIR"
echo "=========================================="
echo ""
echo "Next: push to gh-pages branch"
