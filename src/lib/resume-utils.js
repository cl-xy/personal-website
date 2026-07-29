export function groupJobsByCompany(jobs) {
  const groups = [];
  for (const job of jobs) {
    const last = groups[groups.length - 1];
    if (last && last.company === job.company) {
      last.jobs.push(job);
    } else {
      groups.push({ company: job.company, jobs: [job] });
    }
  }
  return groups;
}
