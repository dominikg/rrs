const defaultOpts = {
  dir: 'build',
};

export default function serve(opts = {}) {
  const { dir } = { ...defaultOpts, ...opts };
  let started = false;
  return {
    writeBundle() {
      if (!started) {
        started = true;
        require('child_process').spawn('npm', ['run', 'serve', '--', dir], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}
