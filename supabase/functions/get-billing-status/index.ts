async function refreshPlanData() {
    const { data: userRes, error: userError } = await supabase.auth.getUser();
    const user = userRes?.user;
  
    if (userError || !user) {
      setUserId(null);
      setCompanyId(null);
      setCompany(null);
      setPlan(null);
      return { planValue: "free" };
    }
  
    setUserId(user.id);
  
    const res = await supabase.functions.invoke("get-billing-status", {
      body: {},
    });
  
    const data: any = res?.data;
    const fnError: any = res?.error;
  
    if (fnError || !data?.ok) {
      setCompanyId(null);
      setCompany(null);
      setPlan(null);
      return { planValue: "free" };
    }
  
    const cid = data?.company_id ? String(data.company_id) : null;
    setCompanyId(cid);
    setCompany((data?.company as Company) || null);
  
    const nextPlan = (data?.plan as CompanyPlan) || null;
    setPlan(nextPlan);
  
    return {
      planValue: normalizePlanName(nextPlan?.plan),
    };
  }