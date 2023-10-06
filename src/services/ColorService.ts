

export default{

    colorPlan(value : any) {
        const gradientMap : any = {
          GOLD:   { background: 'linear-gradient(to bottom, #D4AF37 0%, #C5A028 100%)' },
          SILVER: { background: 'linear-gradient(to bottom, #C0C0C0 0%, #B1B1B1 100%)' },
          BRONZE: { background: 'linear-gradient(to bottom, #CD7F32 0%, #BE7023 100%)' },
        };
        return gradientMap[value] || '';
      }
    
}